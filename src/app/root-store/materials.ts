import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { MaterialsEffects } from './effects/materials.effects';
import * as fromMaterials from './reducers/materials.reducer';

export const provideMaterialsStore = [
  provideState(fromMaterials.materialsFeature),
  provideEffects(MaterialsEffects),
];
