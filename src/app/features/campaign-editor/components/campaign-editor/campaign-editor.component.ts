import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HunterMaterials } from '@app/core/types/HunterMaterials';
import {
  IHunterProfile,
  IHunterProfileForm,
} from '@app/core/types/HunterProfile';
import { isNullOrUndefined } from '@app/core/utility/IsNullOrUndefined';
import { Store } from '@ngrx/store';
import { HunterProfileStoreActions } from '@root-store/actions';
import { HunterProfilesSelectors } from '@root-store/selectors';
import { Subject, debounceTime, take, takeUntil } from 'rxjs';
import { EquipmentAddDialogComponent } from '../equipment-add-dialog/equipment-add-dialog.component';
import { MaterialAddDialogComponent } from '../material-add-dialog/material-add-dialog.component';

@Component({
  selector: 'app-campaign-editor',
  templateUrl: './campaign-editor.component.html',
  styleUrls: ['./campaign-editor.component.scss'],
})
export class CampaignEditorComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<boolean>();

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
    equipedChestId: this._fb.control<string | null>(null),
    equipedFeetId: this._fb.control<string | null>(null),
    equipedHelmId: this._fb.control<string | null>(null),
    equipedWeaponId: this._fb.control<string | null>(null),
  });

  constructor(
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private _store$: Store
  ) {}

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.activeHunterProfile$
      .pipe(takeUntil(this._destroy$))
      .subscribe((profile) => {
        if (profile != undefined) {
          this.hunterForm.enable({ emitEvent: false });
          this.hunterForm.patchValue(profile, { emitEvent: false });
        } else {
          this.hunterForm.disable({ emitEvent: false });
        }
      });

    this.hunterForm.valueChanges
      .pipe(takeUntil(this._destroy$))
      .pipe(debounceTime(500))
      .subscribe((_) => {
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
}
