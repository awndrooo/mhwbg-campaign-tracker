import { createAction, props } from '@ngrx/store';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';

export const loadEquipments = createAction('[Equipment] Load Equipments');

export const loadEquipmentsSuccess = createAction(
  '[Equipment] Load Equipments Success',
  props<{ data: IEquipmentStoreItem[] }>()
);

export const loadEquipmentsFailure = createAction(
  '[Equipment] Load Equipments Failure',
  props<{ error: any }>()
);
