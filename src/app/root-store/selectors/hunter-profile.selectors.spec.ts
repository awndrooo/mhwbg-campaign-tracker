import * as fromHunterProfile from '../reducers/hunter-profile.reducer';
import { selectHunterProfileState } from './hunter-profile.selectors';

describe('HunterProfile Selectors', () => {
  it('should select the feature state', () => {
    const result = selectHunterProfileState({
      [fromHunterProfile.hunterProfileFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
