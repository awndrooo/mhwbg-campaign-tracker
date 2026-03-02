import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IEquipmentWeapon } from '@app/core/types/EquipmentWeapon';
import { IHunterProfile } from '@app/core/types/HunterProfile';
import { filterNullish } from '@app/core/utility/FilterNullish';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { HunterProfileStoreActions } from '@root-store/actions';
import {
  EquipmentSelectors,
  HunterProfilesSelectors,
} from '@root-store/selectors';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { IconComponent, RichTextComponent } from '@shared/components';
import {
  EquipmentIconComponent,
  EquipmentListComponent,
} from '@shared/equipment';
import { MaterialListComponent } from '@shared/materials/components/material-list/material-list.component';
import { delayWhen, filter, map } from 'rxjs';

@Component({
  selector: 'app-hunter-sheet',
  templateUrl: './hunter-sheet.component.html',
  styleUrls: ['./hunter-sheet.component.scss'],
  imports: [
    MatIconModule,
    EquipmentIconComponent,
    EquipmentListComponent,
    MaterialListComponent,
    AsyncPipe,
    MatButtonModule,
    RichTextComponent,
    IconComponent,
  ],
})
export class HunterSheetComponent {
  private _store$ = inject(Store);

  private _activeHunterProfileId$ = this._store$
    .select(HunterProfilesSelectors.selectActiveHunterId)
    .pipe(filterNullish());

  hunterProfile$ = this._store$
    .select(HunterProfilesSelectors.selectActiveHunter)
    .pipe(
      filterNullish(),
      delayWhen(() =>
        this._store$
          .select(EquipmentSelectors.selectIsLoaded)
          .pipe(filter((x) => !!x))
      ),
      concatLatestFrom((profile) =>
        this._store$
          .select(EquipmentSelectors.selectByIds(profile.equipmentCrafted))
          .pipe(
            // filter down to only equiped items
            map((x) =>
              x.filter((e) =>
                [
                  profile.equipedHelmId,
                  profile.equipedChestId,
                  profile.equipedFeetId,
                  profile.equipedWeaponId,
                ].includes(e.id)
              )
            )
          )
      ),
      map(
        ([profile, equipment]) => new HunterProfileViewModel(profile, equipment)
      )
    );

  public consumePotion(): void {
    this._store$.dispatch(
      HunterProfileStoreActions.useHunterPotion({
        count: 1,
      })
    );
  }
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
  get TotalArmor() {
    return this.Equipment.reduce((total, e) => (total += e.armorValue ?? 0), 0);
  }

  constructor(
    public hunterProfile: IHunterProfile,
    public Equipment: IEquipmentStoreItem[]
  ) {}
}
