export interface IHunterProfile {
  hunterId: string;
  hunterName: string;
  playerName: string;
  materials: string[];
  equipmentCrafted: string[];
  equipedWeaponId?: string;
  equipedHelmId?: string;
  equipedChestId?: string;
  equipedFeetId?: string;
  potions: number;
  campaignDay: number;
  notes: string;
}

export class HunterProfile implements IHunterProfile {
  public hunterId: string;
  public hunterName: string;
  public playerName: string;
  public materials: string[];
  public equipmentCrafted: string[];
  public equipedWeaponId?: string | undefined;
  public equipedHelmId?: string | undefined;
  public equipedChestId?: string | undefined;
  public equipedFeetId?: string | undefined;
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
  }
}
