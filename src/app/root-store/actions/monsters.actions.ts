import { Monster } from '@app/core/types/Monster';
import { createAction, props } from '@ngrx/store';

export const loadMonsters = createAction('[Monsters] Load Monsters');

export const loadMonstersSuccess = createAction(
  '[Monsters] Load Monsters Success',
  props<{ data: Monster[] }>()
);

export const loadMonstersFailure = createAction(
  '[Monsters] Load Monsters Failure',
  props<{ error: any }>()
);
