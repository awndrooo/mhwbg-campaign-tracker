import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHunterProfile from '../reducers/hunter-profile.reducer';
import * as fromHunterProfileState from '../state/hunter-profiles.state';

export const selectHunterProfileState =
  createFeatureSelector<fromHunterProfileState.State>(
    fromHunterProfile.hunterProfileFeatureKey
  );

export const { selectAll, selectIds, selectTotal, selectEntities } =
  fromHunterProfileState.featureAdapter.getSelectors(selectHunterProfileState);

export const selectIsLoaded = createSelector(
  selectHunterProfileState,
  (state) => state.isLoaded
);

export const selectById = (hunterId: string | null) =>
  createSelector(selectAll, (profiles) =>
    profiles.find((x) => x.hunterId == hunterId)
  );

export const selectActiveHunterId = createSelector(
  selectHunterProfileState,
  (state) => state.activeHunterId
);

export const selectActiveHunter = createSelector(
  selectAll,
  selectActiveHunterId,
  (profiles, hunterId) => profiles.find((x) => x.hunterId == hunterId)
);
