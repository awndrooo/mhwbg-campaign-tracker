import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { ArmorTypeEnum } from '@app/core/types/ArmorType';
import { EQUIPMENT_MAPS } from '@app/core/types/EquipmentMap';
import {
  EquipmentSubtype,
  EquipmentTypeEnum,
} from '@app/core/types/EquipmentType';
import { WeaponTypeEnum } from '@app/core/types/WeaponType';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';

@Component({
  selector: 'app-equipment-icon',
  templateUrl: './equipment-icon.component.html',
  styleUrls: ['./equipment-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentIconComponent {
  @Input() public equipment:
    | IEquipmentStoreItem
    | EquipmentSubtype
    | ArmorTypeEnum
    | WeaponTypeEnum
    | undefined;

  @HostBinding('class') get _hostClass() {
    return this._getRarityClass();
  }

  public get SvgIcon(): string {
    if (this.equipment != undefined) {
      if (typeof this.equipment !== 'string') {
        switch (this.equipment.equipmentType) {
          case EquipmentTypeEnum.Armor:
            return EQUIPMENT_MAPS[this.equipment.armorType].svgIcon;
          case EquipmentTypeEnum.Weapon:
            return EQUIPMENT_MAPS[this.equipment.weaponType].svgIcon;
        }
      } else {
        return EQUIPMENT_MAPS[this.equipment].svgIcon;
      }
    }
    return '';
  }

  private _getRarityClass(): string | undefined {
    if (this.equipment != undefined && typeof this.equipment !== 'string') {
      return 'rarity-' + this.equipment.rarity;
    }
    return undefined;
  }
}
