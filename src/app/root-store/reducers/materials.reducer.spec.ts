import { initialState } from '@root-store/state/material.state';
import { reducer } from './materials.reducer';

describe('Materials Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
