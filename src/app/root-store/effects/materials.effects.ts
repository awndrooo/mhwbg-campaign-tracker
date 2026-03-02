import { inject, Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as MaterialsActions from '../actions/materials.actions';

@Injectable()
export class MaterialsEffects implements OnInitEffects {
  private _actions$ = inject(Actions);
  private _api = inject(ApiService);

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
}
