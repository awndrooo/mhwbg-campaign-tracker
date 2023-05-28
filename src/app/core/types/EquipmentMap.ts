import { ArmorTypeDescriptionEnum, ArmorTypeEnum } from './ArmorType';
import { EquipmentSubtype, EquipmentTypeEnum } from './EquipmentType';
import { WeaponTypeDescriptionEnum, WeaponTypeEnum } from './WeaponType';

type equipmentMapBase = {
  svgIcon: string;
  description: string;
};

interface equipmentArmorMap extends equipmentMapBase {
  equipmentType: EquipmentTypeEnum.Armor;
}
interface equipmentWeaponMap extends equipmentMapBase {
  equipmentType: EquipmentTypeEnum.Weapon;
}

export type EquipmentMap = {
  [key in EquipmentSubtype]: equipmentArmorMap | equipmentWeaponMap;
};

export const EQUIPMENT_MAPS: EquipmentMap = {
  helm: {
    equipmentType: EquipmentTypeEnum.Armor,
    description: ArmorTypeDescriptionEnum.Helm,
    svgIcon: 'mh-' + ArmorTypeEnum.Helm,
  },
  arms: {
    equipmentType: EquipmentTypeEnum.Armor,
    description: ArmorTypeDescriptionEnum.Arms,
    svgIcon: 'mh-' + ArmorTypeEnum.Arms,
  },
  waist: {
    equipmentType: EquipmentTypeEnum.Armor,
    description: ArmorTypeDescriptionEnum.Waist,
    svgIcon: 'mh-' + ArmorTypeEnum.Waist,
  },
  chest: {
    equipmentType: EquipmentTypeEnum.Armor,
    description: ArmorTypeDescriptionEnum.Chest,
    svgIcon: 'mh-' + ArmorTypeEnum.Chest,
  },
  legs: {
    equipmentType: EquipmentTypeEnum.Armor,
    description: ArmorTypeDescriptionEnum.Legs,
    svgIcon: 'mh-' + ArmorTypeEnum.Legs,
  },
  charm: {
    equipmentType: EquipmentTypeEnum.Armor,
    description: ArmorTypeDescriptionEnum.Charm,
    svgIcon: 'mh-' + ArmorTypeEnum.Charm,
  },
  BW: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.Bow,
    svgIcon: 'mh-' + WeaponTypeEnum.Bow,
  },
  CB: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.ChargeBlade,
    svgIcon: 'mh-' + WeaponTypeEnum.Bow,
  },
  DB: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.DualBlades,
    svgIcon: 'mh-' + WeaponTypeEnum.DualBlades,
  },
  GS: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.GreatSword,
    svgIcon: 'mh-' + WeaponTypeEnum.GreatSword,
  },
  GL: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.GunLance,
    svgIcon: 'mh-' + WeaponTypeEnum.GunLance,
  },
  HA: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.Hammer,
    svgIcon: 'mh-' + WeaponTypeEnum.Hammer,
  },
  HBG: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.HeavyBowGun,
    svgIcon: 'mh-' + WeaponTypeEnum.HeavyBowGun,
  },
  HH: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.HuntingHorn,
    svgIcon: 'mh-' + WeaponTypeEnum.HuntingHorn,
  },
  IG: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.InsectGlaive,
    svgIcon: 'mh-' + WeaponTypeEnum.InsectGlaive,
  },
  LA: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.Lance,
    svgIcon: 'mh-' + WeaponTypeEnum.Lance,
  },
  LBG: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.LightBowGun,
    svgIcon: 'mh-' + WeaponTypeEnum.LightBowGun,
  },
  LS: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.LongSword,
    svgIcon: 'mh-' + WeaponTypeEnum.LongSword,
  },
  SA: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.SwitchAxe,
    svgIcon: 'mh-' + WeaponTypeEnum.SwitchAxe,
  },
  SS: {
    equipmentType: EquipmentTypeEnum.Weapon,
    description: WeaponTypeDescriptionEnum.SwordAndShield,
    svgIcon: 'mh-' + WeaponTypeEnum.SwordAndShield,
  },
};
