import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HunterMaterials } from '@app/core/types/HunterMaterials';
import {
  HunterProfile,
  IHunterProfile,
  IHunterProfileForm,
} from '@app/core/types/HunterProfile';
import { isNullOrUndefined } from '@app/core/utility/IsNullOrUndefined';
import { Store } from '@ngrx/store';
import { HunterProfileStoreActions } from '@root-store/actions';
import { HunterProfilesSelectors } from '@root-store/selectors';
import { debounceTime, take } from 'rxjs';
import { AddHunterDialogComponent } from '../add-hunter-dialog/add-hunter-dialog.component';
import { EquipmentAddDialogComponent } from '../equipment-add-dialog/equipment-add-dialog.component';
import { MaterialAddDialogComponent } from '../material-add-dialog/material-add-dialog.component';

@Component({
  selector: 'app-campaign-editor',
  templateUrl: './campaign-editor.component.html',
  styleUrls: ['./campaign-editor.component.scss'],
})
export class CampaignEditorComponent implements OnInit {
  public hunterProfiles$ = this._store$.select(
    HunterProfilesSelectors.selectAll
  );

  public activeHunterProfile$ = this._store$.select(
    HunterProfilesSelectors.selectActiveHunter
  );

  public hunterForm = this._fb.group<IHunterProfileForm>({
    materials: this._fb.control<HunterMaterials[]>([]),
    hunterId: this._fb.control<string>(''),
    hunterName: this._fb.control<string>(''),
    playerName: this._fb.control<string>(''),
    equipmentCrafted: this._fb.control<string[]>(<string[]>[]),
    potions: this._fb.control<number>(0),
    campaignDay: this._fb.control<number>(0),
    notes: this._fb.control<string>(''),
  });

  constructor(
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private _store$: Store
  ) {}

  ngOnInit(): void {
    this.activeHunterProfile$.subscribe((profile) => {
      if (profile != undefined) {
        this.hunterForm.enable({ emitEvent: false });
        this.hunterForm.patchValue(profile, { emitEvent: false });
      } else {
        this.hunterForm.disable({ emitEvent: false });
      }
    });

    this.hunterForm.valueChanges.pipe(debounceTime(500)).subscribe((_) => {
      const profile = <IHunterProfile>this.hunterForm.getRawValue();
      if (
        profile != null &&
        profile.hunterId != null &&
        profile.hunterId != ''
      ) {
        this._store$.dispatch(
          HunterProfileStoreActions.updateHunterProfile({ data: profile })
        );
      }
    });
  }

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
          let materials = this.hunterForm.value.materials;
          if (materials != null) {
            const ind = materials.findIndex(
              (x) => x.materialId == mat.materialId
            );
            if (ind > -1) {
              materials[ind].count = materials[ind].count + mat.count;
            } else {
              materials = [...materials, mat];
            }
            this.hunterForm.patchValue({ materials });
          }
        });
      });
  }

  public openEquipmentAddDialog(): void {
    this._dialog
      .open<EquipmentAddDialogComponent, undefined, string[]>(
        EquipmentAddDialogComponent,
        {
          minWidth: '90vw',
        }
      )
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (!isNullOrUndefined(res)) {
          const equipment = this.hunterForm.value.equipmentCrafted;
          if (!isNullOrUndefined(equipment)) {
            this.hunterForm.patchValue({
              equipmentCrafted: [...(equipment || []), ...(res || [])],
            });
          }
        }
      });
  }

  public selectHunterProfile(hunterId: string): void {
    this._store$.dispatch(
      HunterProfileStoreActions.selectHunterProfile({ hunterId })
    );
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
    this.hunterForm.reset(undefined, { emitEvent: false });
  }
}
