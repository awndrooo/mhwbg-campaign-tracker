import { IEquipmentBase } from './EquipmentBase';
import { WeaponType } from './WeaponType';

export interface IEquipmentWeapon extends IEquipmentBase {
  equipmentType: 'Weapon';
  type: WeaponType;
  damageDeck: {
    1: number;
    2: number;
    3: number;
    4: number;
    element: number;
  };
}
