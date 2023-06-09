import { FormControl } from '@angular/forms';
import { HunterMaterials } from './HunterMaterials';

export interface IHunterProfile {
  hunterId: string;
  hunterName: string;
  playerName: string;
  materials: HunterMaterials[];
  equipmentCrafted: string[];
  equipedWeaponId: string | null;
  equipedHelmId: string | null;
  equipedChestId: string | null;
  equipedFeetId: string | null;
  potions: number;
  campaignDay: number;
  notes: string;
}

export class HunterProfile implements IHunterProfile {
  public hunterId: string;
  public hunterName: string;
  public playerName: string;
  public materials: HunterMaterials[];
  public equipmentCrafted: string[];
  public equipedWeaponId: string | null;
  public equipedHelmId: string | null;
  public equipedChestId: string | null;
  public equipedFeetId: string | null;
  public potions: number;
  public campaignDay: number;
  public notes: string;

  constructor(hunterName: string, playerName: string) {
    this.hunterId = crypto.randomUUID();
    this.hunterName = hunterName;
    this.playerName = playerName;
    this.materials = [];
    this.equipmentCrafted = [];
    this.potions = 0;
    this.campaignDay = 0;
    this.notes = '';
    this.equipedWeaponId = null;
    this.equipedHelmId = null;
    this.equipedChestId = null;
    this.equipedFeetId = null;
  }
}

type WrappedInterface<T> = {
  [P in keyof T]: FormControl<T[P] | null>;
};

export type IHunterProfileForm = WrappedInterface<IHunterProfile>;
