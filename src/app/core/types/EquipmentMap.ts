import { ArmorTypeDescriptionEnum } from './ArmorType';
import { EquipmentSubtype, EquipmentTypeEnum } from './EquipmentType';
import { WeaponTypeDescriptionEnum } from './WeaponType';

type equipmentMapBase = {
  svgIcon: string;
};

interface equipmentArmorMap extends equipmentMapBase {
  equipmentType: EquipmentTypeEnum.Armor;
  armorTypeDescription: string;
}
interface equipmentWeaponMap extends equipmentMapBase {
  equipmentType: EquipmentTypeEnum.Weapon;
  weaponTypeDescription: string;
}

export type EquipmentMap = {
  [key in EquipmentSubtype]: equipmentArmorMap | equipmentWeaponMap;
};

export const EQUIPMENT_MAPS: EquipmentMap = {
  helm: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeDescriptionEnum.Helm,
    svgIcon: 'mh-helm',
  },
  arms: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeDescriptionEnum.Arms,
    svgIcon: 'mh-arms',
  },
  waist: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeDescriptionEnum.Waist,
    svgIcon: 'mh-waist',
  },
  chest: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeDescriptionEnum.Chest,
    svgIcon: 'mh-chest',
  },
  legs: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeDescriptionEnum.Legs,
    svgIcon: 'mh-legs',
  },
  charm: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeDescriptionEnum.Charm,
    svgIcon: 'mh-charm',
  },
  BW: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.Bow,
    svgIcon: 'mh-bow',
  },
  CB: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.ChargeBlade,
    svgIcon: 'mh-CB',
  },
  DB: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.DualBlades,
    svgIcon: 'mh-DB',
  },
  GS: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.GreatSword,
    svgIcon: 'mh-GS',
  },
  GL: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.GunLance,
    svgIcon: 'mh-GL',
  },
  HA: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.Hammer,
    svgIcon: 'mh-HA',
  },
  HBG: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.HeavyBowGun,
    svgIcon: 'mh-HBG',
  },
  HH: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.HuntingHorn,
    svgIcon: 'mh-HH',
  },
  IG: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.InsectGlaive,
    svgIcon: 'mh-IG',
  },
  LA: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.Lance,
    svgIcon: 'mh-LA',
  },
  LBG: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.LightBowGun,
    svgIcon: 'mh-LBG',
  },
  LS: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.LongSword,
    svgIcon: 'mh-LS',
  },
  SA: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.SwitchAxe,
    svgIcon: 'mh-SA',
  },
  SS: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeDescriptionEnum.SwordAndShield,
    svgIcon: 'mh-SS',
  },
};
