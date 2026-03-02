import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { provideMockStore } from '@ngrx/store/testing';
import { materialsFeatureKey } from '@root-store/reducers/materials.reducer';
import { State, initialState } from '@root-store/state/material.state';
import { firstValueFrom, take } from 'rxjs';
import { Material } from '../types/Material';
import { MaterialsService } from './materials.service';

const entities: {
  [key: string]: Material;
} = {
  'f83bd32b-2cf7-4e36-9f3d-0392ac2d2d72': {
    description: 'Test Material 1 Description',
    id: 'f83bd32b-2cf7-4e36-9f3d-0392ac2d2d72',
    name: 'Test Material 1',
  },
  '00e492ff-483c-456c-9cbe-f0fd96a0a8da': {
    description: 'Test Material 2 Description',
    id: '00e492ff-483c-456c-9cbe-f0fd96a0a8da',
    name: 'Test Material 2',
  },
};
const state: State = {
  ...initialState,
  entities,
  ids: Object.getOwnPropertyNames(entities),
  isLoaded: true,
};

describe('MaterialsService', () => {
  let service: MaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: { [materialsFeatureKey]: state } }),
      ],
    });
    service = TestBed.inject(MaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all materials through Materials$', async () => {
    service.Materials$.pipe(take(1)).subscribe((result) => {
      expect(result.length).toBe(2);
      expect(result).toContain(
        entities['f83bd32b-2cf7-4e36-9f3d-0392ac2d2d72']
      );
      expect(result).toContain(
        entities['00e492ff-483c-456c-9cbe-f0fd96a0a8da']
      );
    });
  });

  it('should #FindMaterialById', async () => {
    const mat = entities['f83bd32b-2cf7-4e36-9f3d-0392ac2d2d72'];
    const result = await firstValueFrom(service.FindMaterialById(mat.id));
    expect(result).toEqual(mat);
  });

  it('should #FindMaterialsById', async () => {
    const result = await firstValueFrom(
      service.FindMaterialsById(state.ids as string[])
    );
    expect(result.length).toBe(state.ids.length);
    state.ids.forEach((id) => expect(result).toContain(entities[id]));
  });
});
