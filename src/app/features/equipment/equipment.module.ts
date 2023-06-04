import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@app/core/angular-material.module';
import { SharedModule } from '@shared/shared.module';
import { EquipmentIconComponent } from './components/equipment-icon/equipment-icon.component';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';
import { EquipmentSearchComponent } from './components/equipment-search/equipment-search.component';

@NgModule({
  declarations: [
    EquipmentListComponent,
    EquipmentSearchComponent,
    EquipmentIconComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    EquipmentListComponent,
    EquipmentSearchComponent,
    EquipmentIconComponent,
  ],
})
export class EquipmentModule {}
