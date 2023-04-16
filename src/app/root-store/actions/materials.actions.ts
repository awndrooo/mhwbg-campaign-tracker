import { Material } from '@app/core/types/Material';
import { createAction, props } from '@ngrx/store';

export const loadMaterials = createAction('[Materials] Load Materialss');

export const loadMaterialsSuccess = createAction(
  '[Materials] Load Materials Success',
  props<{ data: Material[] }>()
);

export const loadMaterialsFailure = createAction(
  '[Materials] Load Materials Failure',
  props<{ error: any }>()
);
