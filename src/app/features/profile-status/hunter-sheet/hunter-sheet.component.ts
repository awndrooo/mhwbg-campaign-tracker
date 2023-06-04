import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IEquipmentWeapon } from '@app/core/types/EquipmentWeapon';
import { IHunterProfile } from '@app/core/types/HunterProfile';
import { isNullOrUndefined } from '@app/core/utility/IsNullOrUndefined';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  EquipmentSelectors,
  HunterProfilesSelectors,
} from '@root-store/selectors';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { delayWhen, filter, map } from 'rxjs';

@Component({
  selector: 'app-hunter-sheet',
  templateUrl: './hunter-sheet.component.html',
  styleUrls: ['./hunter-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HunterSheetComponent {
  hunterProfile$ = this._store$
    .select(HunterProfilesSelectors.selectActiveHunter)
    .pipe(
      filter(
        (profile): profile is IHunterProfile => !isNullOrUndefined(profile)
      ),
      delayWhen(() =>
        this._store$
          .select(EquipmentSelectors.selectIsLoaded)
          .pipe(filter((x) => !!x))
      ),
      concatLatestFrom((profile) =>
        this._store$.select(
          EquipmentSelectors.selectByIds(profile.equipmentCrafted)
        )
      ),
      map(
        ([profile, equipment]) => new HunterProfileViewModel(profile, equipment)
      )
    );

  constructor(private _store$: Store) {}
}

class HunterProfileViewModel {
  get Helm(): IEquipmentStoreItem | undefined {
    return this.Equipment.find((x) => x.id == this.hunterProfile.equipedHelmId);
  }
  get Chest(): IEquipmentStoreItem | undefined {
    return this.Equipment.find(
      (x) => x.id == this.hunterProfile.equipedChestId
    );
  }
  get Feet(): IEquipmentStoreItem | undefined {
    return this.Equipment.find((x) => x.id == this.hunterProfile.equipedFeetId);
  }
  get Weapon(): IEquipmentStoreItem | undefined {
    return this.Equipment.find(
      (x) => x.id == this.hunterProfile.equipedWeaponId
    );
  }
  get WeaponDamage() {
    return Object.entries((this.Weapon as IEquipmentWeapon)?.damageDeck)
      .map((x) => ({
        damage: x[0],
        count: x[1],
      }))
      .filter((x) => x.count > 0);
  }

  constructor(
    public hunterProfile: IHunterProfile,
    public Equipment: IEquipmentStoreItem[]
  ) {}
}
