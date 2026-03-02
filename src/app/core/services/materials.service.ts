import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsSelectors } from '@root-store/selectors';
import { distinctUntilChanged, NEVER, Observable } from 'rxjs';
import { Material } from '../types/Material';

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  private _store$ = inject(Store);

  public Materials$ = this._store$.select(MaterialsSelectors.selectAll);
  public IsLoaded$ = this._store$
    .select(MaterialsSelectors.selectIsLoaded)
    .pipe(distinctUntilChanged());

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
