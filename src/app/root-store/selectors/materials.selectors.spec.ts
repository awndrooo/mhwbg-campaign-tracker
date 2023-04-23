import { State } from '@root-store/state/equipment.state';
import * as fromMaterials from '../reducers/materials.reducer';
import { selectMaterialsState } from './materials.selectors';

describe('Materials Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMaterialsState({
      [fromMaterials.materialsFeatureKey]: {},
    });

    expect(result).toEqual(<State>{});
  });
});
