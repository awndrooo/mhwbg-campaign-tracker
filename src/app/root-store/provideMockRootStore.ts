import { provideMockStore } from '@ngrx/store/testing';
import { equipmentFeatureKey } from './reducers/equipment.reducer';
import { hunterProfileFeatureKey } from './reducers/hunter-profile.reducer';
import { materialsFeatureKey } from './reducers/materials.reducer';
import { monstersFeatureKey } from './reducers/monsters.reducer';
import { initialState as equipmentInitialState } from './state/equipment.state';
import { initialState as hunterProfileInitialState } from './state/hunter-profiles.state';
import { initialState as materialInitialState } from './state/material.state';
import { initialState as monstersInitialState } from './state/monsters.state';

export const provideMockRootStore = () =>
  provideMockStore({
    initialState: {
      [equipmentFeatureKey]: equipmentInitialState,
      [hunterProfileFeatureKey]: hunterProfileInitialState,
      [materialsFeatureKey]: materialInitialState,
      [monstersFeatureKey]: monstersInitialState,
    },
  });
