import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import {
  EquipmentListComponent,
  EquipmentSearchComponent,
} from '@shared/equipment';

@Component({
  selector: 'app-equipment-add-dialog',
  templateUrl: './equipment-add-dialog.component.html',
  styleUrls: ['./equipment-add-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    EquipmentSearchComponent,
    EquipmentListComponent,
  ],
})
export class EquipmentAddDialogComponent {
  public equipmentQueue: string[] | undefined = [];

  public addEquipmentToQueue(equipment: IEquipmentStoreItem): void {
    this.equipmentQueue = [...(this.equipmentQueue || []), equipment.id];
  }
}
