import { EquipmentRarity } from './EquipmentRarity';
import { EquipmentType } from './EquipmentType';

export type EquipmentBase = {
  id: string;
  cardNumber: number;
  name: string;
  description: string;
  equipmentType: EquipmentType;
  rarity: EquipmentRarity;
};
