import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MonstersSelectors } from '@root-store/selectors';
import { distinctUntilChanged, NEVER, Observable } from 'rxjs';
import { Monster } from '../types/Monster';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  private _store$ = inject(Store);

  public Monsters$ = this._store$.select(MonstersSelectors.selectAll);
  public IsLoaded$ = this._store$
    .select(MonstersSelectors.selectIsLoaded)
    .pipe(distinctUntilChanged());

  public FindMonsterById(monsterId: string): Observable<Monster | undefined> {
    return this._store$.select(MonstersSelectors.selectById(monsterId));
  }

  public FindMonstersById(monsterIds: string[] | undefined) {
    if (monsterIds == undefined) {
      return NEVER;
    }
    return this._store$.select(MonstersSelectors.selectByIds(monsterIds));
  }

  public FindMonstersByName(name: string) {
    return this._store$.select(MonstersSelectors.findByName(name));
  }
}
