import { State } from '@root-store/state/equipment.state';
import * as fromEquipment from '../reducers/equipment.reducer';
import { selectEquipmentState } from './equipment.selectors';

describe('Equipment Selectors', () => {
  it('should select the feature state', () => {
    const result = selectEquipmentState({
      [fromEquipment.equipmentFeatureKey]: {},
    });

    expect(result).toEqual(<State>{});
  });
});
