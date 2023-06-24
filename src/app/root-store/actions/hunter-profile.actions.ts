import { HunterProfile, IHunterProfile } from '@app/core/types/HunterProfile';
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

export const selectHunterProfile = createAction(
  '[HunterProfile] Select HunterProfile',
  props<{ hunterId: string }>()
);

export const selectHunterProfileSuccess = createAction(
  '[HunterProfile] Select HunterProfile Success',
  props<{ hunterProfile: HunterProfile }>()
);

export const selectHunterProfileFailure = createAction(
  '[HunterProfile] Select HunterProfile Failure',
  props<{ hunterId: string }>()
);

export const updateHunterProfile = createAction(
  '[HunterProfile] Update HunterProfile',
  props<{ data: IHunterProfile }>()
);

export const updateHunterProfileSuccess = createAction(
  '[HunterProfile] Update HunterProfile Success',
  props<{ data: IHunterProfile }>()
);

export const updateHunterProfileFailure = createAction(
  '[HunterProfile] Update HunterProfile Failure',
  props<{ error: any }>()
);

export const useHunterPotion = createAction(
  '[HunterProfile] UseHunterPotion',
  props<{ count: number; hunterProfileId?: string }>()
);
