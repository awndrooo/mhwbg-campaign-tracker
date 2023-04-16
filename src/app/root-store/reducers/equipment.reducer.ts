import { createFeature, createReducer, on } from '@ngrx/store';
import {
  featureAdapter,
  initialState,
} from '@root-store/state/equipment.state';
import * as EquipmentActions from '../actions/equipment.actions';

export const equipmentFeatureKey = 'equipment';

export const reducer = createReducer(
  initialState,
  on(EquipmentActions.loadEquipments, (state) => state),
  on(EquipmentActions.loadEquipmentsSuccess, (state, action) =>
    featureAdapter.upsertMany(action.data, state)
  ),
  on(EquipmentActions.loadEquipmentsFailure, (state, action) => state)
);

export const equipmentFeature = createFeature({
  name: equipmentFeatureKey,
  reducer,
});
