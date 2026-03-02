import { describe, expect, it } from 'vitest';
import { MaterialSortPipe } from './material-sort.pipe';

describe('MaterialSortPipe', () => {
  it('create an instance', () => {
    const pipe = new MaterialSortPipe();
    expect(pipe).toBeTruthy();
  });
});
