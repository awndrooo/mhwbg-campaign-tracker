import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EquipmentService } from '@app/core/services/equipment.service';
import { ArmorTypeEnum } from '@app/core/types/ArmorType';
import { EquipmentTypeEnum } from '@app/core/types/EquipmentType';
import { WeaponTypeEnum } from '@app/core/types/WeaponType';
import { filterNullish } from '@app/core/utility/FilterNullish';
import { Store } from '@ngrx/store';
import { HunterProfileStoreActions } from '@root-store/actions';
import { HunterProfilesSelectors } from '@root-store/selectors';
import { Subject, debounceTime, takeUntil, tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-outfitter',
  templateUrl: './outfitter.component.html',
  styleUrls: ['./outfitter.component.scss'],
})
export class OutfitterComponent implements OnDestroy {
  private _destroy$ = new Subject<boolean>();

  public helms$ = this._equipmentService.HunterEquipmentType(
    EquipmentTypeEnum.Armor,
    ArmorTypeEnum.Helm
  );
  public chest$ = this._equipmentService.HunterEquipmentType(
    EquipmentTypeEnum.Armor,
    ArmorTypeEnum.Chest
  );
  public legs$ = this._equipmentService.HunterEquipmentType(
    EquipmentTypeEnum.Armor,
    ArmorTypeEnum.Legs
  );
  public weapons$ = this._equipmentService.HunterWeapons$;

  public equipedForm = this._fb.group({
    equipedChestId: this._fb.control<string | null>(null),
    equipedFeetId: this._fb.control<string | null>(null),
    equipedHelmId: this._fb.control<string | null>(null),
    equipedWeaponId: this._fb.control<string | null>(null),
  });
  private _activeHunter$ = this._store$
    .select(HunterProfilesSelectors.selectActiveHunter)
    .pipe(
      tap((x) =>
        x == undefined || x == null
          ? this.equipedForm.disable({ emitEvent: false })
          : this.equipedForm.enable({ emitEvent: false })
      ),
      filterNullish(),
      takeUntil(this._destroy$)
    );

  WeaponTypeEnum = WeaponTypeEnum;
  ArmorTypeEnum = ArmorTypeEnum;
  constructor(
    private _equipmentService: EquipmentService,
    private _fb: FormBuilder,
    private _store$: Store
  ) {
    this._activeHunter$.subscribe((profile) => {
      this.equipedForm.patchValue(
        {
          equipedChestId: profile?.equipedChestId,
          equipedFeetId: profile?.equipedFeetId,
          equipedHelmId: profile?.equipedHelmId,
          equipedWeaponId: profile?.equipedWeaponId,
        },
        { emitEvent: false }
      );
    });

    this.equipedForm.valueChanges
      .pipe(debounceTime(500), withLatestFrom(this._activeHunter$))
      .subscribe(([values, profile]) => {
        if (
          profile != null &&
          profile.hunterId != null &&
          profile.hunterId != ''
        ) {
          profile = { ...profile, ...values };
          this._store$.dispatch(
            HunterProfileStoreActions.updateHunterProfile({ data: profile })
          );
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }
}
