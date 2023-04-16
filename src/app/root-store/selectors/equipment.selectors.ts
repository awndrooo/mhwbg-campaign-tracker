import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEquipment from '../reducers/equipment.reducer';

export const selectEquipmentState = createFeatureSelector<fromEquipment.State>(
  fromEquipment.equipmentFeatureKey
);
