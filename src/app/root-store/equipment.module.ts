import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromEquipment from './reducers/equipment.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EquipmentEffects } from './effects/equipment.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromEquipment.equipmentFeatureKey, fromEquipment.reducer),
    EffectsModule.forFeature([EquipmentEffects])
  ]
})
export class EquipmentModule { }
