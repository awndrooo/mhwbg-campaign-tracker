import { createAction, props } from '@ngrx/store';

export const loadEquipments = createAction(
  '[Equipment] Load Equipments'
);

export const loadEquipmentsSuccess = createAction(
  '[Equipment] Load Equipments Success',
  props<{ data: any }>()
);

export const loadEquipmentsFailure = createAction(
  '[Equipment] Load Equipments Failure',
  props<{ error: any }>()
);
