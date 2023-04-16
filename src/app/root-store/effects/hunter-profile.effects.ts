import { Injectable } from '@angular/core';
import { DbService } from '@app/core/services/db.service';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { HunterProfilesSelectors } from '@root-store/selectors';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  take,
} from 'rxjs/operators';
import * as HunterProfileActions from '../actions/hunter-profile.actions';

const SESSION_ACTIVE_HUNTER_ID_KEY = 'ActiveHunterId';

@Injectable()
export class HunterProfileEffects implements OnInitEffects {
  private get _sessionActiveHunterId(): string | null {
    return sessionStorage.getItem(SESSION_ACTIVE_HUNTER_ID_KEY);
  }
  private set _sessionActiveHunterId(value) {
    sessionStorage.setItem(SESSION_ACTIVE_HUNTER_ID_KEY, value || '');
  }

  constructor(
    private _actions$: Actions,
    private _dbService: DbService,
    private _store$: Store
  ) {}

  ngrxOnInitEffects(): Action {
    return HunterProfileActions.loadHunterProfiles();
  }

  loadHunterProfiles$ = createEffect(() =>
    this._actions$.pipe(
      ofType(HunterProfileActions.loadHunterProfiles),
      concatMap(() =>
        this._dbService.GetHunterProfiles().pipe(
          take(1),
          switchMap((data) => {
            const actions: Action[] = [
              HunterProfileActions.loadHunterProfilesSuccess({ data }),
            ];
            if (this._sessionActiveHunterId != null) {
              actions.push(
                HunterProfileActions.selectHunterProfile({
                  hunterId: this._sessionActiveHunterId || '',
                })
              );
            }
            return of(...actions);
          }),
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

  selectHunterProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(HunterProfileActions.selectHunterProfile),
      filter(
        (action) => action.hunterId != null && action.hunterId != undefined
      ),
      concatMap((action) =>
        this._store$
          .select(HunterProfilesSelectors.selectById(action.hunterId))
          .pipe(
            take(1),
            map((hunterProfile) => {
              if (hunterProfile != null && hunterProfile != undefined) {
                this._sessionActiveHunterId = hunterProfile.hunterId;
                return HunterProfileActions.selectHunterProfileSuccess({
                  hunterProfile,
                });
              } else {
                return HunterProfileActions.selectHunterProfileFailure({
                  hunterId: action.hunterId,
                });
              }
            })
          )
      )
    )
  );

  updateHunterProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(HunterProfileActions.updateHunterProfile),
      concatMap((action) =>
        this._dbService.UpdateHunterProfile(action.data).pipe(
          take(1),
          map((res) =>
            HunterProfileActions.updateHunterProfileSuccess({
              data: action.data,
            })
          ),
          catchError((error) =>
            of(HunterProfileActions.updateHunterProfileFailure({ error }))
          )
        )
      )
    )
  );
}
