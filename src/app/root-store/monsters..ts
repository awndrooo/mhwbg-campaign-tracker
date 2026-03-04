import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { MonstersEffects } from './effects/monsters.effects';
import * as fromMonsters from './reducers/monsters.reducer';

export const provideMonstersStore = [
  provideState(fromMonsters.materialsFeature),
  provideEffects(MonstersEffects),
];
