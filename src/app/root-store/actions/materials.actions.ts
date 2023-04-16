import { Material } from '@app/core/types/Material';
import { createAction, props } from '@ngrx/store';

export const loadMaterials = createAction('[Materials] Load Materialss');

export const loadMaterialsSuccess = createAction(
  '[Materials] Load Materialss Success',
  props<{ data: Material[] }>()
);

export const loadMaterialsFailure = createAction(
  '[Materials] Load Materialss Failure',
  props<{ error: any }>()
);
