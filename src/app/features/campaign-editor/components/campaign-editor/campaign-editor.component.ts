import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from '@app/core/services/db.service';
import { HunterMaterials } from '@app/core/types/HunterMaterials';
import { HunterProfile } from '@app/core/types/HunterProfile';
import { Store } from '@ngrx/store';
import { HunterProfileStoreActions } from '@root-store/actions';
import { HunterProfilesSelectors } from '@root-store/selectors';
import { take } from 'rxjs';
import { AddHunterDialogComponent } from '../add-hunter-dialog/add-hunter-dialog.component';
import { MaterialAddDialogComponent } from '../material-add-dialog/material-add-dialog.component';

@Component({
  selector: 'app-campaign-editor',
  templateUrl: './campaign-editor.component.html',
  styleUrls: ['./campaign-editor.component.scss'],
})
export class CampaignEditorComponent {
  public hunterProfiles$ = this._store$.select(
    HunterProfilesSelectors.selectAll
  );
  public hunterMaterials: HunterMaterials[] = [];

  constructor(
    private _dialog: MatDialog,
    private _dbService: DbService,
    private _store$: Store
  ) {}

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

  public addHunterProfile(): void {
    this._dialog
      .open(AddHunterDialogComponent)
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this._store$.dispatch(
            HunterProfileStoreActions.addHunterProfile({
              data: new HunterProfile(res.hunterName, res.playerName),
            })
          );
        }
      });
  }

  public removeHunterProfile(hunterId: string): void {
    this._store$.dispatch(
      HunterProfileStoreActions.deleteHunterProfile({ hunterId })
    );
  }
}
