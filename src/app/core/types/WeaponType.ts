export type WeaponType = `${WeaponTypeEnum}`;

export type WeaponTypeShorthand =
  | 'BW'
  | 'CB'
  | 'DB'
  | 'GS'
  | 'GL'
  | 'HA'
  | 'HBG'
  | 'HH'
  | 'IG'
  | 'LA'
  | 'LBG'
  | 'LS'
  | 'SA'
  | 'SS';

export enum WeaponTypeEnum {
  Hammer = 'Hammer',
  HuntingHorn = 'Hunting Horn',
  LongSword = 'Long Sword',
  HeavyBowGun = 'Heavy Bow Gun',
  LightBowGun = 'Light Bow Gun',
  Bow = 'Bow',
  GreatSword = 'Great Sword',
  SwordAndShield = 'Sword and Shield',
  DualBlades = 'Dual Blades',
  InsectGlaive = 'Insect Glaive',
  Lance = 'Lance',
  GunLance = 'Gun Lance',
  SwitchAxe = 'Switch Axe',
  ChargeBlade = 'Charge Blade',
}
