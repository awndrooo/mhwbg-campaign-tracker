import { EquipmentBase } from './EquipmentBase';
import { WeaponType } from './WeaponType';

export type EquipmentWeapon = EquipmentBase & {
  type: WeaponType;
  damageDeck: {
    1: number;
    2: number;
    3: number;
    4: number;
  };
};
