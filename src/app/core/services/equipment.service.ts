import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  EquipmentSelectors,
  HunterProfilesSelectors,
} from '@root-store/selectors';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import {
  NEVER,
  Observable,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';
import { ArmorTypeShorthand } from '../types/ArmorType';
import { IEquipmentArmor } from '../types/EquipmentArmor';
import { EquipmentType, EquipmentTypeEnum } from '../types/EquipmentType';
import { IEquipmentWeapon } from '../types/EquipmentWeapon';
import { WeaponTypeShorthand } from '../types/WeaponType';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  public Equipment$ = this._store$.select(EquipmentSelectors.selectAll);
  public IsLoaded$ = this._store$
    .select(EquipmentSelectors.selectIsLoaded)
    .pipe(distinctUntilChanged());

  public HunterEquipment$ = this._store$
    .select(HunterProfilesSelectors.selectActiveHunter)
    .pipe(
      filter((profile) => !!profile),
      map((profile) => profile?.equipmentCrafted),
      filter((equipment) => !!equipment),
      switchMap((equipment) => this.FindEquipmentByIds(equipment)),
      shareReplay()
    );
  public HunterArmors$ = this.HunterEquipment$.pipe(
    map((equipment) =>
      equipment.filter((x) => x.equipmentType == EquipmentTypeEnum.Armor)
    ),
    map((equipment) => <IEquipmentArmor[]>equipment)
  );
  public HunterWeapons$ = this.HunterEquipment$.pipe(
    map((equipment) =>
      equipment.filter((x) => x.equipmentType == EquipmentTypeEnum.Weapon)
    ),
    map((equipment) => <IEquipmentWeapon[]>equipment)
  );

  constructor(private _store$: Store) {}

  public HunterEquipmentType<T extends EquipmentType>(
    type: T,
    subType?: ArmorTypeShorthand | WeaponTypeShorthand
  ): EquipmentFilterType<T> {
    if (type == EquipmentTypeEnum.Armor) {
      return this.HunterArmors$.pipe(
        map((armor) => armor.filter((x) => x.armorType == subType))
      ) as EquipmentFilterType<T>;
    } else if (type == EquipmentTypeEnum.Weapon) {
      return this.HunterWeapons$.pipe(
        map((weapon) => weapon.filter((x) => x.weaponType == subType))
      ) as EquipmentFilterType<T>;
    } else {
      return NEVER as EquipmentFilterType<T>;
    }
  }

  public FindEquipmentById(
    materialId: string
  ): Observable<IEquipmentStoreItem | undefined> {
    return this._store$.select(EquipmentSelectors.selectById(materialId));
  }

  public FindEquipmentByIds(equipmentIds: string[] | undefined) {
    if (equipmentIds == undefined) return NEVER;
    return this._store$.select(EquipmentSelectors.selectByIds(equipmentIds));
  }
}

type EquipmentFilterType<T> = T extends EquipmentTypeEnum.Armor
  ? Observable<IEquipmentArmor[]>
  : T extends EquipmentTypeEnum.Weapon
  ? Observable<IEquipmentWeapon[]>
  : Observable<never>;
