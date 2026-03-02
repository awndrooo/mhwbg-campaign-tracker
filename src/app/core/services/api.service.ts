import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { Observable, share, take } from 'rxjs';
import { Material } from '../types/Material';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);
  private _env = inject(EnvironmentService);

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
