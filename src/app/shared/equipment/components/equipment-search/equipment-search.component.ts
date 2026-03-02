import { AsyncPipe } from '@angular/common';
import { Component, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { EquipmentService } from '@app/core/services/equipment.service';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { Subject, filter, map, withLatestFrom } from 'rxjs';
import { EquipmentIconComponent } from '../equipment-icon/equipment-icon.component';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.scss'],
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    EquipmentIconComponent,
    AsyncPipe,
  ],
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
