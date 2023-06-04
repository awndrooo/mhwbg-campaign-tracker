import { IEquipmentBase } from './EquipmentBase';
import { WeaponTypeShorthand } from './WeaponType';

export interface IEquipmentWeapon extends IEquipmentBase {
  equipmentType: 'Weapon';
  weaponType: WeaponTypeShorthand;
  damageDeck: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
