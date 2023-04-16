import { Injectable } from '@angular/core';
import { DbService } from '@app/core/services/db.service';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, take } from 'rxjs/operators';
import * as HunterProfileActions from '../actions/hunter-profile.actions';

@Injectable()
export class HunterProfileEffects implements OnInitEffects {
  constructor(private _actions$: Actions, private _dbService: DbService) {}

  ngrxOnInitEffects(): Action {
    return HunterProfileActions.loadHunterProfiles();
  }

  loadHunterProfiles$ = createEffect(() =>
    this._actions$.pipe(
      ofType(HunterProfileActions.loadHunterProfiles),
      concatMap(() =>
        this._dbService.GetHunterProfiles().pipe(
          take(1),
          map((data) =>
            HunterProfileActions.loadHunterProfilesSuccess({ data })
          ),
          catchError((error) =>
            of(HunterProfileActions.loadHunterProfilesFailure({ error }))
          )
        )
      )
    )
  );

  addHunterProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(HunterProfileActions.addHunterProfile),
      concatMap((action) =>
        this._dbService.AddHunterProfile(action.data).pipe(
          take(1),
          map((res) => ({ ...action.data, hunterId: res })),
          map((data) => HunterProfileActions.addHunterProfileSuccess({ data })),
          catchError((error) =>
            of(HunterProfileActions.addHunterProfileFailure({ error }))
          )
        )
      )
    )
  );

  deleteHunterProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(HunterProfileActions.deleteHunterProfile),
      concatMap((action) =>
        this._dbService.DeleteHunterProfile(action.hunterId).pipe(
          take(1),
          map((res) =>
            res
              ? HunterProfileActions.deleteHunterProfileSuccess({
                  hunterId: action.hunterId,
                })
              : HunterProfileActions.deleteHunterProfileFailure({ error: res })
          ),
          catchError((error) =>
            of(HunterProfileActions.addHunterProfileFailure({ error }))
          )
        )
      )
    )
  );
}
