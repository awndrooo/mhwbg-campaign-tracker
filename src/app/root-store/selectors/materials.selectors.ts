import { createFeatureSelector, createSelector } from '@ngrx/store';
import { materialsFeatureKey } from '@root-store/reducers/materials.reducer';
import * as fromMaterialsState from '@root-store/state/material.state';

export const selectMaterialsState =
  createFeatureSelector<fromMaterialsState.State>(materialsFeatureKey);

export const { selectAll, selectIds, selectTotal, selectEntities } =
  fromMaterialsState.featureAdapter.getSelectors(selectMaterialsState);

export const selectIsLoaded = createSelector(
  selectMaterialsState,
  (state) => state.isLoaded
);

export const selectById = (materialId: string) =>
  createSelector(selectAll, (materials) =>
    materials.find((x) => x.id == materialId)
  );

export const selectByIds = (materialIds: string[]) =>
  createSelector(selectAll, (materials) =>
    materials.filter((x) => materialIds.includes(x.id))
  );
