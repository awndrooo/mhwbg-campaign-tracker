import { AsyncPipe } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MaterialsService } from '@app/core/services/materials.service';
import { MonsterService } from '@app/core/services/monster.service';
import { Material } from '@app/core/types/Material';
import { filter, map, of, Subject, switchMap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-material-search',
  templateUrl: './material-search.component.html',
  styleUrls: ['./material-search.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class MaterialSearchComponent {
  private _materialsService = inject(MaterialsService);
  private _monsterService = inject(MonsterService);

  private _OnMaterialAdd = new Subject<Material>();
  @Output()
  public get OnMaterialAdd() {
    return this._OnMaterialAdd;
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private set OnMaterialAdd(value) {
    this._OnMaterialAdd = value;
  }

  public Search$ = new Subject<string>();
  private _searchMonster$ = this.Search$.pipe(
    switchMap((query) =>
      query.startsWith('monster:') && query.substring(8).trim() != ''
        ? this._monsterService.FindMonstersByName(query.substring(8))
        : of([])
    )
  );
  public SearchResult$ = this.Search$.pipe(
    withLatestFrom(this._materialsService.Materials$, this._searchMonster$),
    filter(
      ([searchValue, _]) =>
        searchValue != null && searchValue.trim().length >= 2
    ),
    map(([searchValue, materials, monster]) => {
      // Find carve materials of a monster
      if (searchValue.startsWith('monster:')) {
        return materials.filter((material) =>
          monster
            .reduce((prev, cur) => prev.concat(cur.carveParts), <string[]>[])
            .includes(material.id)
        );
      } else {
        // Find materials by name
        return materials
          .filter((x) =>
            x.name.toUpperCase().includes(searchValue.toUpperCase())
          )
          .slice(0, 9);
      }
    })
  );
}
