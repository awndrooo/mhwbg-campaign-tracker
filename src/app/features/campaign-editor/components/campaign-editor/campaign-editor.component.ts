import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ArmorTypeEnum } from '@app/core/types/ArmorType';
import { EquipmentTypeEnum } from '@app/core/types/EquipmentType';
import { HunterMaterials } from '@app/core/types/HunterMaterials';
import {
  IHunterProfile,
  IHunterProfileForm,
} from '@app/core/types/HunterProfile';
import { isNullOrUndefined } from '@app/core/utility/IsNullOrUndefined';
import { Store } from '@ngrx/store';
import { HunterProfileStoreActions } from '@root-store/actions';
import { HunterProfilesSelectors } from '@root-store/selectors';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { CounterComponent } from '@shared/components';
import {
  EquipmentIconComponent,
  EquipmentListComponent,
} from '@shared/equipment';
import { MaterialListComponent } from '@shared/materials/components/material-list/material-list.component';
import { debounceTime, Subject, take, takeUntil } from 'rxjs';
import { EquipmentAddDialogComponent } from '../equipment-add-dialog/equipment-add-dialog.component';
import { MaterialAddDialogComponent } from '../material-add-dialog/material-add-dialog.component';

@Component({
  selector: 'app-campaign-editor',
  templateUrl: './campaign-editor.component.html',
  styleUrls: ['./campaign-editor.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MaterialListComponent,
    EquipmentIconComponent,
    EquipmentListComponent,
    MatInputModule,
    MatButtonModule,
    CounterComponent,
  ],
})
export class CampaignEditorComponent implements OnInit, OnDestroy {
  private _dialog = inject(MatDialog);
  private _fb = inject(FormBuilder);
  private _store$ = inject(Store);

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
  protected __attachedEquipment = signal<string[]>([]);

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
          this._setAttachedEquipment(profile);
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
          if (this._validateAttachedEquipment(profile)) {
            this._setAttachedEquipment(profile);
            this.hunterForm.setValue(profile);
          }
          this._store$.dispatch(
            HunterProfileStoreActions.updateHunterProfile({ data: profile })
          );
        }
      });
  }

  private _validateAttachedEquipment(profile: IHunterProfile): boolean {
    // If a piece of crafted equipment is removed while equiped, unequip it
    let changed = false;
    if (
      profile.equipedChestId &&
      !profile.equipmentCrafted.includes(profile.equipedChestId)
    )
      (profile.equipedChestId = null), (changed = true);
    if (
      profile.equipedFeetId &&
      !profile.equipmentCrafted.includes(profile.equipedFeetId)
    )
      (profile.equipedFeetId = null), (changed = true);
    if (
      profile.equipedHelmId &&
      !profile.equipmentCrafted.includes(profile.equipedHelmId)
    )
      (profile.equipedHelmId = null), (changed = true);
    if (
      profile.equipedWeaponId &&
      !profile.equipmentCrafted.includes(profile.equipedWeaponId)
    )
      (profile.equipedWeaponId = null), (changed = true);

    return changed;
  }

  private _setAttachedEquipment(profile: IHunterProfile): void {
    const items = [
      profile.equipedChestId,
      profile.equipedFeetId,
      profile.equipedHelmId,
      profile.equipedWeaponId,
    ].filter((x) => x !== null);
    this.__attachedEquipment.set(items);
  }

  protected __equipmentAttachedHandler(item: IEquipmentStoreItem): void {
    if (item.equipmentType == EquipmentTypeEnum.Armor) {
      switch (item.armorType) {
        case ArmorTypeEnum.Helm:
          this.hunterForm.patchValue({
            equipedHelmId: item.id,
          });
          break;
        case ArmorTypeEnum.Chest:
          this.hunterForm.patchValue({
            equipedChestId: item.id,
          });
          break;
          break;
        case ArmorTypeEnum.Legs:
          this.hunterForm.patchValue({
            equipedFeetId: item.id,
          });
          break;
      }
    } else {
      this.hunterForm.patchValue({
        equipedWeaponId: item.id,
      });
    }
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
