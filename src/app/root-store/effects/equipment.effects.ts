import { inject, Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as EquipmentActions from '../actions/equipment.actions';

@Injectable()
export class EquipmentEffects implements OnInitEffects {
  private _actions$ = inject(Actions);
  private _api = inject(ApiService);

  ngrxOnInitEffects(): Action {
    return EquipmentActions.loadEquipments();
  }

  loadEquipments$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(EquipmentActions.loadEquipments),
      concatMap(() =>
        this._api.GetEquipment().pipe(
          map((data) => EquipmentActions.loadEquipmentsSuccess({ data })),
          catchError((error: Error) =>
            of(EquipmentActions.loadEquipmentsFailure({ error }))
          )
        )
      )
    );
  });
}
