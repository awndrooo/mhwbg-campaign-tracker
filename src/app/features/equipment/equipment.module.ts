import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@app/core/angular-material.module';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';
import { EquipmentSearchComponent } from './components/equipment-search/equipment-search.component';

@NgModule({
  declarations: [EquipmentListComponent, EquipmentSearchComponent],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [EquipmentListComponent, EquipmentSearchComponent],
})
export class EquipmentModule {}
