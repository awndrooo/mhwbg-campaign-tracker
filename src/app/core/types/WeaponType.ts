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
  Hammer = 'HA',
  HuntingHorn = 'HH',
  LongSword = 'LS',
  HeavyBowGun = 'HBG',
  LightBowGun = 'LBG',
  Bow = 'BW',
  GreatSword = 'GS',
  SwordAndShield = 'SS',
  DualBlades = 'DB',
  InsectGlaive = 'IG',
  Lance = 'LA',
  GunLance = 'GL',
  SwitchAxe = 'SA',
  ChargeBlade = 'CB',
}

export enum WeaponTypeDescriptionEnum {
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
