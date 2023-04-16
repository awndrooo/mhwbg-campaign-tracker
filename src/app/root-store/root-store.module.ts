import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EquipmentModule } from './equipment.module';
import { MaterialsModule } from './materials.module';
import { metaReducers, reducers } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(),
    EquipmentModule,
    MaterialsModule,
  ],
})
export class RootStoreModule {}
