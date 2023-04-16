import { ArmorType, ArmorTypeEnum } from './ArmorType';
import { EquipmentShorthand, EquipmentTypeEnum } from './EquipmentType';
import { WeaponType, WeaponTypeEnum } from './WeaponType';

type equipmentMapBase = {
  svgIcon: string;
};

interface equipmentArmorMap extends equipmentMapBase {
  equipmentType: EquipmentTypeEnum.Armor;
  armorTypeDescription: ArmorType;
}
interface equipmentWeaponMap extends equipmentMapBase {
  equipmentType: EquipmentTypeEnum.Weapon;
  weaponTypeDescription: WeaponType;
}

export type EquipmentMap = {
  [key in EquipmentShorthand]: equipmentArmorMap | equipmentWeaponMap;
  // | {
  //     equipmentType: EquipmentType;
  //     armorType: ArmorType;
  //     svgIcon: string;
  //   }
  // | {
  //     equipmentType: EquipmentType;
  //     weaponType: WeaponType;
  //     svgIcon: string;
  //   };
};

export const EQUIPMENT_MAPS: EquipmentMap = {
  helm: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeEnum.Helm,
    svgIcon: 'mh-helm',
  },
  arms: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeEnum.Arms,
    svgIcon: 'mh-arms',
  },
  torso: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeEnum.Torso,
    svgIcon: 'mh-torso',
  },
  chest: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeEnum.Chest,
    svgIcon: 'mh-chest',
  },
  legs: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeEnum.Legs,
    svgIcon: 'mh-legs',
  },
  charm: {
    equipmentType: EquipmentTypeEnum.Armor,
    armorTypeDescription: ArmorTypeEnum.Charm,
    svgIcon: 'mh-charm',
  },
  BW: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.Bow,
    svgIcon: 'mh-bow',
  },
  CB: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.ChargeBlade,
    svgIcon: 'mh-CB',
  },
  DB: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.DualBlades,
    svgIcon: 'mh-DB',
  },
  GS: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.GreatSword,
    svgIcon: 'mh-GS',
  },
  GL: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.GunLance,
    svgIcon: 'mh-GL',
  },
  HA: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.Hammer,
    svgIcon: 'mh-HA',
  },
  HBG: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.HeavyBowGun,
    svgIcon: 'mh-HBG',
  },
  HH: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.HuntingHorn,
    svgIcon: 'mh-HH',
  },
  IG: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.InsectGlaive,
    svgIcon: 'mh-IG',
  },
  LA: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.Lance,
    svgIcon: 'mh-LA',
  },
  LBG: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.LightBowGun,
    svgIcon: 'mh-LBG',
  },
  LS: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.LongSword,
    svgIcon: 'mh-LS',
  },
  SA: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.SwitchAxe,
    svgIcon: 'mh-SA',
  },
  SS: {
    equipmentType: EquipmentTypeEnum.Weapon,
    weaponTypeDescription: WeaponTypeEnum.SwordAndShield,
    svgIcon: 'mh-SS',
  },
};
