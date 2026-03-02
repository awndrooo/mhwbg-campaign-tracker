import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEquipmentStore } from './equipment.module';
import { provideHunterProfileStore } from './hunter-profiles.module';
import { provideMaterialsStore } from './materials.module';
import { metaReducers, reducers } from './reducers';

export const provideRootStore = [
  provideStore(reducers, { metaReducers }),
  provideEffects(),
  provideStoreDevtools(),
  ...provideEquipmentStore,
  ...provideHunterProfileStore,
  ...provideMaterialsStore,
];
