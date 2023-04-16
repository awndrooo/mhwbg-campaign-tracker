import { IEquipmentArmor } from '@app/core/types/EquipmentArmor';
import { IEquipmentWeapon } from '@app/core/types/EquipmentWeapon';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export type IEquipmentStoreItem = IEquipmentArmor | IEquipmentWeapon;

export interface State extends EntityState<IEquipmentStoreItem> {
  isLoaded: boolean;
}

export const featureAdapter = createEntityAdapter<IEquipmentStoreItem>({
  selectId: (x) => x.id,
  sortComparer: (x, y) => x.id.localeCompare(y.id),
});

export const initialState: State = featureAdapter.getInitialState({
  isLoaded: false,
});
