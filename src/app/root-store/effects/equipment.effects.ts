import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as EquipmentActions from '../actions/equipment.actions';

@Injectable()
export class EquipmentEffects implements OnInitEffects {
  constructor(private _actions$: Actions, private _http: HttpClient) {}

  ngrxOnInitEffects(): Action {
    return EquipmentActions.loadEquipments();
  }

  loadEquipments$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(EquipmentActions.loadEquipments),
      concatMap(() =>
        this._http
          .get<IEquipmentStoreItem[]>(environment.ApiHost + '/equipment')
          .pipe(
            map((data) => EquipmentActions.loadEquipmentsSuccess({ data })),
            catchError((error) =>
              of(EquipmentActions.loadEquipmentsFailure({ error }))
            )
          )
      )
    );
  });
}
