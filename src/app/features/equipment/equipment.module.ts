import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';



@NgModule({
  declarations: [
    EquipmentListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EquipmentListComponent
  ]
})
export class EquipmentModule { }
