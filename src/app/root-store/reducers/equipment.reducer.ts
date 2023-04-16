import { createFeature, createReducer, on } from '@ngrx/store';
import * as EquipmentActions from '../actions/equipment.actions';

export const equipmentFeatureKey = 'equipment';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(EquipmentActions.loadEquipments, state => state),
  on(EquipmentActions.loadEquipmentsSuccess, (state, action) => state),
  on(EquipmentActions.loadEquipmentsFailure, (state, action) => state),
);

export const equipmentFeature = createFeature({
  name: equipmentFeatureKey,
  reducer,
});

