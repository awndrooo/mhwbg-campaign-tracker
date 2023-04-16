import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EquipmentSelectors } from '@root-store/selectors';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  public Equipment$ = this._store$.select(EquipmentSelectors.selectAll);
  public IsLoaded$ = this._store$
    .select(EquipmentSelectors.selectIsLoaded)
    .pipe(distinctUntilChanged());

  constructor(private _store$: Store) {}

  public FindEquipmentById(
    materialId: string
  ): Observable<IEquipmentStoreItem | undefined> {
    return this._store$.select(EquipmentSelectors.selectById(materialId));
  }

  public FindEquipmentByIds(equipmentIds: string[]) {
    return this._store$.select(EquipmentSelectors.selectByIds(equipmentIds));
  }
}
