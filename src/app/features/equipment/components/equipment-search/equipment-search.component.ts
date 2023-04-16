import { Component, Output } from '@angular/core';
import { EquipmentService } from '@app/core/services/equipment.service';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { Subject, filter, map, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.scss'],
})
export class EquipmentSearchComponent {
  private _OnEquipmentAdd = new Subject<IEquipmentStoreItem>();
  @Output()
  public get OnEquipmentAdd() {
    return this._OnEquipmentAdd;
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private set OnEquipmentAdd(value) {
    this._OnEquipmentAdd = value;
  }

  public Search$ = new Subject<string>();
  public SearchResult$ = this.Search$.pipe(
    withLatestFrom(this._equipmentService.Equipment$),
    filter(
      ([searchValue, _]) =>
        searchValue != null && searchValue.trim().length >= 2
    ),
    map(([searchValue, equipments]) =>
      equipments
        .filter(
          (x) =>
            x.name.toUpperCase().includes(searchValue.toUpperCase()) ||
            x.description.toUpperCase().includes(searchValue.toUpperCase()) ||
            (x.equipmentType === 'Weapon' &&
              x.weaponType.toUpperCase().includes(searchValue.toUpperCase()))
        )
        .slice(0, 9)
    )
  );

  constructor(private _equipmentService: EquipmentService) {}
}
