import { createFeature, createReducer, on } from '@ngrx/store';
import * as MaterialsActions from '../actions/materials.actions';
import * as MaterialsState from '../state/material.state';

export const materialsFeatureKey = 'materials';

export const reducer = createReducer(
  MaterialsState.initialState,
  on(MaterialsActions.loadMaterials, (state) => state),
  on(MaterialsActions.loadMaterialsSuccess, (state, action) =>
    MaterialsState.featureAdapter.upsertMany(action.data, {
      ...state,
      isLoaded: true,
    })
  ),
  on(MaterialsActions.loadMaterialsFailure, (state, action) => state)
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});
