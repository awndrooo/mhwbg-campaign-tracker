import { Component, Output } from '@angular/core';
import { MaterialsService } from '@app/core/services/materials.service';
import { Material } from '@app/core/types/Material';
import { Subject, filter, map, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-material-search',
  templateUrl: './material-search.component.html',
  styleUrls: ['./material-search.component.scss'],
})
export class MaterialSearchComponent {
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
  public SearchResult$ = this.Search$.pipe(
    withLatestFrom(this._materialsService.Materials$),
    filter(
      ([searchValue, _]) =>
        searchValue != null && searchValue.trim().length >= 2
    ),
    map(([searchValue, materials]) =>
      materials
        .filter((x) => x.name.toUpperCase().includes(searchValue.toUpperCase()))
        .slice(0, 9)
    )
  );

  constructor(private _materialsService: MaterialsService) {}
}
