import { IHunterProfile } from '@app/core/types/HunterProfile';
import { createAction, props } from '@ngrx/store';

export const loadHunterProfiles = createAction(
  '[HunterProfile] Load HunterProfiles'
);

export const loadHunterProfilesSuccess = createAction(
  '[HunterProfile] Load HunterProfiles Success',
  props<{ data: IHunterProfile[] }>()
);

export const loadHunterProfilesFailure = createAction(
  '[HunterProfile] Load HunterProfiles Failure',
  props<{ error: any }>()
);

export const addHunterProfile = createAction(
  '[HunterProfile] Add HunterProfile',
  props<{ data: IHunterProfile }>()
);

export const addHunterProfileSuccess = createAction(
  '[HunterProfile] Add HunterProfile Success',
  props<{ data: IHunterProfile }>()
);

export const addHunterProfileFailure = createAction(
  '[HunterProfile] Add HunterProfile Failure',
  props<{ error: any }>()
);

export const deleteHunterProfile = createAction(
  '[HunterProfile] Delete HunterProfile',
  props<{ hunterId: string }>()
);

export const deleteHunterProfileSuccess = createAction(
  '[HunterProfile] Delete HunterProfile Success',
  props<{ hunterId: string }>()
);

export const deleteHunterProfileFailure = createAction(
  '[HunterProfile] Delete HunterProfile Failure',
  props<{ error: any }>()
);
