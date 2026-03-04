import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { HunterProfileEffects } from './effects/hunter-profile.effects';
import * as fromHunterProfile from './reducers/hunter-profile.reducer';

export const provideHunterProfileStore = [
  provideState(fromHunterProfile.hunterProfileFeature),
  provideEffects(HunterProfileEffects),
];
