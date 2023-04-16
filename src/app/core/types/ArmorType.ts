export type ArmorType = `${ArmorTypeEnum}`;

export type ArmorTypeShorthand =
  | 'helm'
  | 'arms'
  | 'waist'
  | 'chest'
  | 'legs'
  | 'charm';

export enum ArmorTypeEnum {
  Helm = 'helm',
  Arms = 'arms',
  Waist = 'waist',
  Chest = 'chest',
  Legs = 'legs',
  Charm = 'charm',
}

export enum ArmorTypeDescriptionEnum {
  Helm = 'Helm',
  Arms = 'Arms',
  Waist = 'Waist',
  Chest = 'Chest',
  Legs = 'Legs',
  Charm = 'Charm',
}
