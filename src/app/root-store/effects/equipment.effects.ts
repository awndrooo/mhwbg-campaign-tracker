import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as EquipmentActions from '../actions/equipment.actions';


@Injectable()
export class EquipmentEffects {

  loadEquipments$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(EquipmentActions.loadEquipments),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => EquipmentActions.loadEquipmentsSuccess({ data })),
          catchError(error => of(EquipmentActions.loadEquipmentsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
