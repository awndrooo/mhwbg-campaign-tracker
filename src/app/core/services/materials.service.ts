import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MaterialsSelectors } from '@root-store/selectors';
import { NEVER, Observable, distinctUntilChanged } from 'rxjs';
import { Material } from '../types/Material';

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  public Materials$ = this._store$.select(MaterialsSelectors.selectAll);
  public IsLoaded$ = this._store$
    .select(MaterialsSelectors.selectIsLoaded)
    .pipe(distinctUntilChanged());

  constructor(private _store$: Store, private _dialog: MatDialog) {}

  public FindMaterialById(
    materialId: string
  ): Observable<Material | undefined> {
    return this._store$.select(MaterialsSelectors.selectById(materialId));
  }

  public FindMaterialsById(materialIds: string[] | undefined) {
    if (materialIds == undefined) {
      return NEVER;
    }
    return this._store$.select(MaterialsSelectors.selectByIds(materialIds));
  }
}
