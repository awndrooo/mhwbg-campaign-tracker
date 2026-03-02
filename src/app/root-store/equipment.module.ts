import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { EquipmentEffects } from './effects/equipment.effects';
import * as fromEquipment from './reducers/equipment.reducer';

export const provideEquipmentStore = [
  provideState(fromEquipment.equipmentFeature),
  provideEffects(EquipmentEffects),
];
