import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEquipment from '../reducers/equipment.reducer';
import * as fromEquipmentState from '../state/equipment.state';

export const selectEquipmentState =
  createFeatureSelector<fromEquipmentState.State>(
    fromEquipment.equipmentFeatureKey
  );

export const { selectAll, selectIds, selectTotal, selectEntities } =
  fromEquipmentState.featureAdapter.getSelectors(selectEquipmentState);

export const selectIsLoaded = createSelector(
  selectEquipmentState,
  (state) => state.isLoaded
);

export const selectById = (equipmentId: string | undefined | null) =>
  createSelector(selectAll, (equipment) =>
    equipment.find((x) => x.id == equipmentId)
  );

export const selectByIds = (equipmentIds: (string | undefined | null)[]) =>
  createSelector(selectAll, (equipment) =>
    equipment.filter((x) => equipmentIds.filter((x) => !!x).includes(x.id))
  );
