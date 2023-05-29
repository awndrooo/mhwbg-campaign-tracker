import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { Observable, share, take } from 'rxjs';
import { Material } from '../types/Material';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient, private _env: EnvironmentService) {}

  GetEquipment(): Observable<IEquipmentStoreItem[]> {
    return this._http
      .get<IEquipmentStoreItem[]>(`${this._env.ApiHost}/equipment`, {
        responseType: 'json',
      })
      .pipe(take(1), share());
  }

  GetMaterials(): Observable<Material[]> {
    return this._http
      .get<Material[]>(`${this._env.ApiHost}/materials`, {
        responseType: 'json',
      })
      .pipe(take(1), share());
  }
}
