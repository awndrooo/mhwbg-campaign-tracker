import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { provideMockStore } from '@ngrx/store/testing';
import { equipmentFeatureKey } from '@root-store/reducers/equipment.reducer';
import { hunterProfileFeatureKey } from '@root-store/reducers/hunter-profile.reducer';
import {
  IEquipmentStoreItem,
  initialState,
  State,
} from '@root-store/state/equipment.state';
import {
  initialState as initialProfileState,
  State as ProfileState,
} from '@root-store/state/hunter-profiles.state';
import { firstValueFrom } from 'rxjs';
import { ArmorTypeEnum } from '../types/ArmorType';
import { IEquipmentArmor } from '../types/EquipmentArmor';
import { EquipmentTypeEnum } from '../types/EquipmentType';
import { EquipmentService } from './equipment.service';

const entities: {
  [key: string]: IEquipmentStoreItem;
} = {
  '41aafd99-543b-4e95-b3df-00b5784e601c': {
    armorType: 'helm',
    armorValue: 1,
    cardNumber: 2,
    equipmentType: 'Armor',
    description: 'description',
    id: '41aafd99-543b-4e95-b3df-00b5784e601c',
    name: 'Test Armor',
    note: 'note',
    rarity: 'white',
  },
  'aca16f0c-4ef6-4d17-a481-e9c9743c6de4': {
    armorType: 'legs',
    armorValue: 1,
    cardNumber: 4,
    equipmentType: 'Armor',
    description: 'description',
    id: 'aca16f0c-4ef6-4d17-a481-e9c9743c6de4',
    name: 'Test Armor',
    note: 'note',
    rarity: 'white',
  },
  'da88c98a-6888-440e-8059-34641e15a8e5': {
    equipmentType: 'Weapon',
    cardNumber: 2,
    damageDeck: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 0,
    },
    description: 'description',
    id: 'da88c98a-6888-440e-8059-34641e15a8e5',
    name: 'name',
    note: 'note',
    rarity: 'green',
    weaponType: 'HH',
  },
  'c6bd6238-4159-4a78-9874-bf4c2719c9a7': {
    equipmentType: 'Weapon',
    cardNumber: 2,
    damageDeck: {
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 0,
    },
    description: 'description',
    id: 'c6bd6238-4159-4a78-9874-bf4c2719c9a7',
    name: 'name',
    note: 'note',
    rarity: 'green',
    weaponType: 'IG',
  },
};
const state: State = {
  ...initialState,
  entities,
  ids: Object.getOwnPropertyNames(entities),
  isLoaded: true,
};

const profileState: ProfileState = {
  ...initialProfileState,
  entities: {
    'b43f9d4f-ef82-4eba-bfb1-db2a5ae850bd': {
      campaignDay: 0,
      equipedChestId: null,
      equipedFeetId: null,
      equipedHelmId: null,
      equipedWeaponId: null,
      equipmentCrafted: state.ids.map((x) => x.toString()),
      hunterId: 'b43f9d4f-ef82-4eba-bfb1-db2a5ae850bd',
      hunterName: 'Test Hunter',
      materials: [],
      notes: '',
      playerName: 'Test Player',
      potions: 0,
    },
  },
  ids: ['b43f9d4f-ef82-4eba-bfb1-db2a5ae850bd'],
  activeHunterId: 'b43f9d4f-ef82-4eba-bfb1-db2a5ae850bd',
  isLoaded: true,
};

describe('EquipmentService', () => {
  let service: EquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            [equipmentFeatureKey]: state,
            [hunterProfileFeatureKey]: profileState,
          },
        }),
      ],
    });
    service = TestBed.inject(EquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an entity from #FindEquipmentById', async () => {
    const result = await firstValueFrom(
      service.FindEquipmentById(state.ids[0] as string)
    );
    expect(result).toEqual(entities[state.ids[0]]);
  });

  it('should return entities from #FindEquipmentByIds', async () => {
    const result = await firstValueFrom(
      service.FindEquipmentByIds(state.ids as string[])
    );
    expect(result.length).toBe(4);
    expect(result).toContain(entities[state.ids[0]]);
    expect(result).toContain(entities[state.ids[1]]);
    expect(result).toContain(entities[state.ids[2]]);
    expect(result).toContain(entities[state.ids[3]]);
  });

  it('should return the helm armor item from #HunterEquipmentType', async () => {
    const result = await firstValueFrom(
      service.HunterEquipmentType(EquipmentTypeEnum.Armor, ArmorTypeEnum.Helm)
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(
      entities['41aafd99-543b-4e95-b3df-00b5784e601c'] as IEquipmentArmor
    );
  });
});
