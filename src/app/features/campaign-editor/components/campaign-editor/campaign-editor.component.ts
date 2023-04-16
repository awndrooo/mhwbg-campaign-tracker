import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HunterMaterials } from '@app/core/types/HunterMaterials';
import { take } from 'rxjs';
import { MaterialAddDialogComponent } from '../material-add-dialog/material-add-dialog.component';

@Component({
  selector: 'app-campaign-editor',
  templateUrl: './campaign-editor.component.html',
  styleUrls: ['./campaign-editor.component.scss'],
})
export class CampaignEditorComponent {
  public hunterMaterials: HunterMaterials[] = [];

  constructor(private _dialog: MatDialog) {}

  public openMaterialAddDialog(): void {
    this._dialog
      .open<MaterialAddDialogComponent, undefined, HunterMaterials[]>(
        MaterialAddDialogComponent,
        {
          minWidth: '90vw',
        }
      )
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        res?.forEach((mat) => {
          const ind = this.hunterMaterials.findIndex(
            (x) => x.materialId == mat.materialId
          );
          if (ind > -1) {
            this.hunterMaterials[ind].count =
              this.hunterMaterials[ind].count + mat.count;
            this.hunterMaterials = [...this.hunterMaterials];
          } else {
            this.hunterMaterials = [...this.hunterMaterials, mat];
          }
        });
      });
  }

  public changeMaterialCount(materialId: string, delta: number): void {
    const ind = this.hunterMaterials.findIndex(
      (x) => x.materialId == materialId
    );
    if (ind > -1) {
      this.hunterMaterials[ind].count = Math.max(
        this.hunterMaterials[ind].count + delta,
        0
      );
      this.hunterMaterials = [...this.hunterMaterials];
    }
  }

  public removeMaterial(materialId: string): void {
    const ind = this.hunterMaterials.findIndex(
      (x) => x.materialId == materialId
    );
    this.hunterMaterials.splice(ind, 1);
    this.hunterMaterials = [...this.hunterMaterials];
  }
}
