import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as MaterialsActions from '../actions/materials.actions';

@Injectable()
export class MaterialsEffects implements OnInitEffects {
  ngrxOnInitEffects = () => MaterialsActions.loadMaterials();

  loadMaterials$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      concatMap(() =>
        this._api.GetMaterials().pipe(
          map((data) => MaterialsActions.loadMaterialsSuccess({ data })),
          catchError((error) =>
            of(MaterialsActions.loadMaterialsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private _actions$: Actions, private _api: ApiService) {}
}
