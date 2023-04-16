import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromHunterProfile from './reducers/hunter-profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HunterProfileEffects } from './effects/hunter-profile.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromHunterProfile.hunterProfileFeatureKey, fromHunterProfile.reducer),
    EffectsModule.forFeature([HunterProfileEffects])
  ]
})
export class HunterProfilesModule { }
