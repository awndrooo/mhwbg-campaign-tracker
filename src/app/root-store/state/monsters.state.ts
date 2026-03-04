import { Monster } from '@app/core/types/Monster';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<Monster> {
  isLoaded: boolean;
}

export const featureAdapter = createEntityAdapter<Monster>({
  selectId: (x) => x.id,
  sortComparer: (x: Monster, y: Monster): number => x.id.localeCompare(y.id),
});

export const initialState: State = featureAdapter.getInitialState({
  isLoaded: false,
});
