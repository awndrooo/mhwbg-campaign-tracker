import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { HunterMaterials } from '@app/core/types/HunterMaterials';
import { Material } from '@app/core/types/Material';
import { MaterialListComponent } from '@shared/materials/components/material-list/material-list.component';
import { MaterialSearchComponent } from '@shared/materials/components/material-search/material-search.component';

@Component({
  selector: 'app-material-add-dialog',
  templateUrl: './material-add-dialog.component.html',
  styleUrls: ['./material-add-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MaterialListComponent,
    MaterialSearchComponent,
    MatDividerModule,
    MatButtonModule,
  ],
})
export class MaterialAddDialogComponent {
  public materialQueue: HunterMaterials[] = [];

  public addMaterialToQueue(material: Material): void {
    const ind = this.materialQueue.findIndex(
      (x) => x.materialId == material.id
    );
    if (ind > -1) {
      this.materialQueue[ind].count = this.materialQueue[ind].count + 1;
    } else {
      this.materialQueue.push({
        count: 1,
        materialId: material.id,
      });
      this.materialQueue = [...this.materialQueue];
    }
  }

  public changeMaterialCount(materialId: string, delta: number): void {
    const ind = this.materialQueue.findIndex((x) => x.materialId == materialId);
    if (ind > -1) {
      this.materialQueue[ind].count = Math.max(
        this.materialQueue[ind].count + delta,
        0
      );
      this.materialQueue = [...this.materialQueue];
    }
  }

  public removeMaterial(materialId: string): void {
    const ind = this.materialQueue.findIndex((x) => x.materialId == materialId);
    this.materialQueue.splice(ind, 1);
    this.materialQueue = [...this.materialQueue];
  }
}
