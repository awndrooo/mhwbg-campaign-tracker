import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularMaterialModule } from '@app/core/angular-material.module';
import { EquipmentModule } from '@features/equipment/equipment.module';
import { MaterialsModule } from '@features/materials/materials.module';
import { SharedModule } from '@shared/shared.module';
import { HunterSheetComponent } from './hunter-sheet/hunter-sheet.component';
import { ProfileStatusRoutingModule } from './profile-status-routing.module';

@NgModule({
  declarations: [HunterSheetComponent],
  imports: [
    CommonModule,
    ProfileStatusRoutingModule,
    AngularMaterialModule,
    SharedModule,
    EquipmentModule,
    MaterialsModule,
  ],
})
export class ProfileStatusModule {}
