import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, map, pipe, switchMap } from 'rxjs';
import { IHunterProfile } from '../types/HunterProfile';
import { EnvironmentService } from './environment.service';

// OBJECT STORES
export const HUNTER_PROFILE_STORE_NAME = 'HunterProfiles';

const IDB_STORE = (storeName: string) =>
  pipe<Observable<IDBDatabase>, Observable<IDBObjectStore>>(
    map((db) => db.transaction(storeName, 'readwrite').objectStore(storeName))
  );

const transactionToObservable = <T>() =>
  pipe(
    switchMap(
      (transaction: IDBRequest) =>
        new Observable<T>((s) => {
          transaction.onsuccess = (_) => {
            s.next(transaction.result);
            s.complete();
          };
          transaction.onerror = (err) => {
            s.error(err);
            s.complete();
          };
        })
    )
  );

const IDB_GETALL = <T>() =>
  pipe<Observable<IDBObjectStore>, Observable<IDBRequest>, Observable<T>>(
    map((objectStore) => objectStore.getAll()),
    transactionToObservable<T>()
  );

const IDB_GET = <T>(hunterIds: IDBValidKey | IDBKeyRange) =>
  pipe<Observable<IDBObjectStore>, Observable<IDBRequest>, Observable<T>>(
    map((objectStore) => objectStore.get(hunterIds)),
    transactionToObservable<T>()
  );

const IDB_PUT = <T>(object: T) =>
  pipe<
    Observable<IDBObjectStore>,
    Observable<IDBRequest>,
    Observable<IDBValidKey>
  >(
    map((objectStore) => objectStore.put(object)),
    transactionToObservable<IDBValidKey>()
  );

const IDB_ADD = <T>(object: T, key: IDBValidKey | undefined = undefined) =>
  pipe<
    Observable<IDBObjectStore>,
    Observable<IDBRequest>,
    Observable<IDBValidKey>
  >(
    map((objectStore) => objectStore.add(object, key)),
    transactionToObservable<IDBValidKey>()
  );

const IDB_DELETE = (hunterId: string) =>
  pipe<
    Observable<IDBObjectStore>,
    Observable<IDBRequest>,
    Observable<undefined>
  >(
    map((objectStore) => objectStore.delete(hunterId)),
    transactionToObservable<undefined>()
  );

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private _db$: Subject<IDBDatabase> = new ReplaySubject<IDBDatabase>(1);

  constructor(private _env: EnvironmentService) {
    this._connect(this._env.IDBName, this._env.IDBVersion);
  }

  private _connect(dbName: string, version: number) {
    const openRequest = indexedDB.open(dbName, version);
    openRequest.onupgradeneeded = (e) => {
      const db = (<IDBOpenDBRequest>e.target).result;
      db.createObjectStore(HUNTER_PROFILE_STORE_NAME, { keyPath: 'hunterId' });
    };
    openRequest.onsuccess = (e) => this._db$.next(openRequest.result);
  }

  public GetHunterProfiles(): Observable<IHunterProfile[]> {
    return this._db$.pipe(
      IDB_STORE(HUNTER_PROFILE_STORE_NAME),
      IDB_GETALL<IHunterProfile[]>()
    );
  }

  public GetHunterProfile(hunterId: string): Observable<IHunterProfile> {
    return this._db$.pipe(
      IDB_STORE(HUNTER_PROFILE_STORE_NAME),
      IDB_GET<IHunterProfile>(hunterId)
    );
  }

  public AddHunterProfile(profile: IHunterProfile): Observable<string> {
    if (profile.hunterId == '') {
      throw new Error('Cannot insert hunter with empty Id');
    }

    return this._db$.pipe(
      IDB_STORE(HUNTER_PROFILE_STORE_NAME),
      IDB_ADD(profile),
      map((x) => <string>x)
    );
  }

  public UpdateHunterProfile(profile: IHunterProfile): Observable<string> {
    return this._db$.pipe(
      IDB_STORE(HUNTER_PROFILE_STORE_NAME),
      IDB_PUT(profile),
      map((x) => <string>x)
    );
  }

  public DeleteHunterProfile(hunterId: string) {
    return this._db$.pipe(
      IDB_STORE(HUNTER_PROFILE_STORE_NAME),
      IDB_DELETE(hunterId),
      map((x) => (x == undefined ? true : x))
    );
  }
}
