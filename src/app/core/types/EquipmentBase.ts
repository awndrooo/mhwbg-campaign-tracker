import { EquipmentRarity } from './EquipmentRarity';
import { EquipmentType } from './EquipmentType';

export interface IEquipmentBase {
  id: string;
  cardNumber: number;
  name: string;
  description: string;
  equipmentType: EquipmentType;
  rarity: EquipmentRarity;
  armorValue?: number | undefined;
  note: string | undefined;
}
