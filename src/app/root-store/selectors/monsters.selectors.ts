import { createFeatureSelector, createSelector } from '@ngrx/store';
import { monstersFeatureKey } from '@root-store/reducers/monsters.reducer';
import * as fromMonstersState from '@root-store/state/monsters.state';

export const selectMaterialsState =
  createFeatureSelector<fromMonstersState.State>(monstersFeatureKey);

export const { selectAll, selectIds, selectTotal, selectEntities } =
  fromMonstersState.featureAdapter.getSelectors(selectMaterialsState);

export const selectIsLoaded = createSelector(
  selectMaterialsState,
  (state) => state.isLoaded
);

export const selectById = (monsterId: string) =>
  createSelector(selectEntities, (monsters) => monsters[monsterId]);

export const selectByIds = (monsterId: string[]) =>
  createSelector(selectAll, (monsters) =>
    monsters.filter((x) => monsterId.includes(x.id))
  );

export const findByName = (name: string) =>
  createSelector(selectAll, (monsters) =>
    monsters.filter((x) =>
      x.name.toLocaleLowerCase().includes(name.toLowerCase())
    )
  );
