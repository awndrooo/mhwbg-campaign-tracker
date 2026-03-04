import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsSelectors } from '@root-store/selectors';
import {
  distinctUntilChanged,
  filter,
  NEVER,
  Observable,
  switchMap,
} from 'rxjs';
import { Material } from '../types/Material';
import { MonsterService } from './monster.service';

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  private _store$ = inject(Store);
  private _monsterService = inject(MonsterService);

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

  public FindMaterialsByMonsterId(monsterId: string | undefined) {
    if (monsterId === undefined) return NEVER;

    return this._monsterService.FindMonsterById(monsterId).pipe(
      filter((m) => !!m),
      switchMap((monster) =>
        this._store$.select(MaterialsSelectors.selectByIds(monster?.carveParts))
      )
    );
  }
}
