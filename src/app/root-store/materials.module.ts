import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromMaterials from './reducers/materials.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MaterialsEffects } from './effects/materials.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromMaterials.materialsFeatureKey, fromMaterials.reducer),
    EffectsModule.forFeature([MaterialsEffects])
  ]
})
export class MaterialsModule { }
