import { IHunterProfile } from '@app/core/types/HunterProfile';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<IHunterProfile> {
  activeHunterId: string | null;
  isLoaded: boolean;
}

export const featureAdapter = createEntityAdapter<IHunterProfile>({
  selectId: (x) => x.hunterId,
  sortComparer: (x, y) => x.hunterId.localeCompare(y.hunterId),
});

export const initialState = featureAdapter.getInitialState({
  isLoaded: false,
  activeHunterId: null as string | null,
});
