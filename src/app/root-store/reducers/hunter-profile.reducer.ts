import { createFeature, createReducer, on } from '@ngrx/store';
import * as HunterProfileActions from '../actions/hunter-profile.actions';
import * as HunterProfileState from '../state/hunter-profiles.state';

export const hunterProfileFeatureKey = 'hunterProfile';

export const reducer = createReducer(
  HunterProfileState.initialState,
  on(HunterProfileActions.loadHunterProfiles, (state) => ({
    ...state,
    isLoaded: false,
  })),
  on(HunterProfileActions.loadHunterProfilesSuccess, (state, action) =>
    HunterProfileState.featureAdapter.upsertMany(action.data, {
      ...state,
      isLoaded: true,
    })
  ),
  on(HunterProfileActions.loadHunterProfilesFailure, (state, action) => state),
  on(HunterProfileActions.addHunterProfileSuccess, (state, action) =>
    HunterProfileState.featureAdapter.upsertOne(action.data, {
      ...state,
      activeHunterId: action.data.hunterId,
    })
  ),
  on(HunterProfileActions.deleteHunterProfileSuccess, (state, action) =>
    HunterProfileState.featureAdapter.removeOne(action.hunterId, {
      ...state,
      activeHunterId:
        state.activeHunterId == action.hunterId ? null : state.activeHunterId,
    })
  ),
  on(HunterProfileActions.selectHunterProfileSuccess, (state, action) => ({
    ...state,
    activeHunterId: action.hunterProfile.hunterId,
  })),
  on(HunterProfileActions.updateHunterProfileSuccess, (state, action) =>
    HunterProfileState.featureAdapter.upsertOne(action.data, state)
  )
);

export const hunterProfileFeature = createFeature({
  name: hunterProfileFeatureKey,
  reducer,
});
