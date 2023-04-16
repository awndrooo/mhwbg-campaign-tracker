import { EquipmentArmor } from './EquipmentArmor';
import { EquipmentBase } from './EquipmentBase';
import { EquipmentWeapon } from './EquipmentWeapon';
import { HunterMaterials } from './HunterMaterials';

export type HunterProfile = {
  hunterName: string;
  playerName: string;
  materials: HunterMaterials[];
  equipmentCrafted: EquipmentBase[];
  equipedWeapon: EquipmentWeapon;
  equipedHelm: EquipmentArmor;
  equipedChest: EquipmentArmor;
  equipedFeet: EquipmentArmor;
  potions: number;
  campaignDay: number;
  notes: string;
};
