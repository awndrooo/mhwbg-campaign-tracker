import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEquipmentStore } from './equipment';
import { provideHunterProfileStore } from './hunter-profiles';
import { provideMaterialsStore } from './materials';
import { provideMonstersStore } from './monsters.';
import { metaReducers, reducers } from './reducers';

export const provideRootStore = [
  provideStore(reducers, { metaReducers }),
  provideEffects(),
  provideStoreDevtools(),
  ...provideEquipmentStore,
  ...provideHunterProfileStore,
  ...provideMaterialsStore,
  ...provideMonstersStore,
];
