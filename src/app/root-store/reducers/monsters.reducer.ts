import { createFeature, createReducer, on } from '@ngrx/store';
import * as MonstersActions from '../actions/monsters.actions';
import * as MonstersState from '../state/monsters.state';

export const monstersFeatureKey = 'monsters';

export const reducer = createReducer(
  MonstersState.initialState,
  on(MonstersActions.loadMonsters, (state) => state),
  on(MonstersActions.loadMonstersSuccess, (state, action) =>
    MonstersState.featureAdapter.upsertMany(action.data, {
      ...state,
      isLoaded: true,
    })
  ),
  on(MonstersActions.loadMonstersFailure, (state) => state)
);

export const materialsFeature = createFeature({
  name: monstersFeatureKey,
  reducer,
});
