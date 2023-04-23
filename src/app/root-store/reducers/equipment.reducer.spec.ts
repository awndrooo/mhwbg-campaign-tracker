import { initialState } from '@root-store/state/equipment.state';
import { reducer } from './equipment.reducer';

describe('Equipment Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
