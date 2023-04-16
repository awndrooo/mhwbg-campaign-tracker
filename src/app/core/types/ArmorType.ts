export type ArmorType = `${ArmorTypeEnum}`;

export type ArmorTypeShorthand =
  | 'helm'
  | 'arms'
  | 'torso'
  | 'chest'
  | 'legs'
  | 'charm';

export enum ArmorTypeEnum {
  Helm = 'Helm',
  Arms = 'Arms',
  Torso = 'Torso',
  Chest = 'Chest',
  Legs = 'Legs',
  Charm = 'Charm',
}
