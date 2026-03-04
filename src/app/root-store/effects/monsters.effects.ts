import { inject, Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as MonsterActions from '../actions/monsters.actions';

@Injectable()
export class MonstersEffects implements OnInitEffects {
  private _actions$ = inject(Actions);
  private _api = inject(ApiService);

  ngrxOnInitEffects = () => MonsterActions.loadMonsters();

  loadMaterials$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(MonsterActions.loadMonsters),
      concatMap(() =>
        this._api.GetMonsters().pipe(
          map((data) => MonsterActions.loadMonstersSuccess({ data })),
          catchError((error) =>
            of(MonsterActions.loadMonstersFailure({ error }))
          )
        )
      )
    );
  });
}
