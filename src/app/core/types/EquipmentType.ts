import { ArmorTypeShorthand } from './ArmorType';
import { WeaponTypeShorthand } from './WeaponType';

export type EquipmentType = `${EquipmentTypeEnum}`;

export enum EquipmentTypeEnum {
  Armor = 'Armor',
  Weapon = 'Weapon',
}

export type EquipmentShorthand = ArmorTypeShorthand | WeaponTypeShorthand;
