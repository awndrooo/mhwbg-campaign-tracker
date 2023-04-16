import { ArmorTypeShorthand } from './ArmorType';
import { IEquipmentBase } from './EquipmentBase';

export interface IEquipmentArmor extends IEquipmentBase {
  equipmentType: 'Armor';
  armorType: ArmorTypeShorthand;
}
