import { Material } from '@app/core/types/Material';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<Material> {
  isLoaded: boolean;
}

export const featureAdapter = createEntityAdapter<Material>({
  selectId: (x) => x.id,
  sortComparer: (x: Material, y: Material): number => x.id.localeCompare(y.id),
});

export const initialState = featureAdapter.getInitialState({
  isLoaded: false,
});
