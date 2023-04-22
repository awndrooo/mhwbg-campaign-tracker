import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from '@app/core/types/Material';
import { environment } from '@env/environment';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as MaterialsActions from '../actions/materials.actions';

@Injectable()
export class MaterialsEffects implements OnInitEffects {
  ngrxOnInitEffects = () => MaterialsActions.loadMaterials();

  loadMaterialss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      concatMap(() =>
        this._http
          .get<Material[]>(`${environment.ApiHost}/materials`, {
            responseType: 'json',
          })
          .pipe(
            map((data) => MaterialsActions.loadMaterialsSuccess({ data })),
            catchError((error) =>
              of(MaterialsActions.loadMaterialsFailure({ error }))
            )
          )
      )
    );
  });

  constructor(private actions$: Actions, private _http: HttpClient) {}
}
