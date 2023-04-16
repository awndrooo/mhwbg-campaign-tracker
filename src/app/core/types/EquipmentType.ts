import { ArmorType } from './ArmorType';
import { WeaponType } from './WeaponType';

export type EquipmentType = `${EquipmentTypeEnum}`;

export enum EquipmentTypeEnum {
  Armor = 'Armor',
  Weapon = 'Weapon',
}

export type EquipmentSubtype = ArmorType | WeaponType;
