import { Component } from '@angular/core';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';

@Component({
  selector: 'app-equipment-add-dialog',
  templateUrl: './equipment-add-dialog.component.html',
  styleUrls: ['./equipment-add-dialog.component.scss'],
})
export class EquipmentAddDialogComponent {
  public equipmentQueue: string[] | undefined = [];

  public addEquipmentToQueue(equipment: IEquipmentStoreItem): void {
    this.equipmentQueue = [...(this.equipmentQueue || []), equipment.id];
  }
}
