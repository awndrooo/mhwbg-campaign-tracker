import { initialState } from '@root-store/state/hunter-profiles.state';
import { reducer } from './hunter-profile.reducer';

describe('HunterProfile Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
