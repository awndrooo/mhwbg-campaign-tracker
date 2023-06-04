import { Component, Input, Output, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { EquipmentService } from '@app/core/services/equipment.service';
import { EQUIPMENT_MAPS } from '@app/core/types/EquipmentMap';
import { EquipmentTypeEnum } from '@app/core/types/EquipmentType';
import { filterNullish } from '@app/core/utility/FilterNullish';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { ReplaySubject, Subject, switchMap } from 'rxjs';

type COLUMN_NAMES = 'Type' | 'Name' | 'Notes' | 'CardNumber' | 'Description';
@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => EquipmentListComponent),
    },
  ],
})
export class EquipmentListComponent implements ControlValueAccessor {
  private _equipment: string[] | undefined;
  public get Equipment(): string[] | undefined {
    return this._equipment;
  }
  @Input()
  public set Equipment(value: string[] | undefined) {
    this._equipment = value;
    this._equipment$.next(value);
  }
  @Input() public ShowControls: boolean = false;
  @Input() public Columns: COLUMN_NAMES[] = [
    'Type',
    'Name',
    'Notes',
    'CardNumber',
    'Description',
  ];
  @Output('EquipmentChange') public EquipmentChange$ = new Subject<
    string[] | undefined
  >();

  private _equipment$ = new ReplaySubject<string[] | undefined>();
  public Equipment$ = this._equipment$.pipe(
    filterNullish(),
    switchMap((x) => this._equipmentService.FindEquipmentByIds(x))
  );

  constructor(private _equipmentService: EquipmentService) {}

  public removeEquipment(item: IEquipmentStoreItem) {
    if (!this.disabled && this.Equipment !== undefined) {
      const ind = this.Equipment.findIndex((x) => x == item.id);
      if (ind !== undefined && ind > -1) {
        this.Equipment?.splice(ind, 1);
        this.EquipmentChange$.next(this.Equipment);
        this._equipment$.next(this.Equipment);
        this.onChange(this.Equipment);
      }
    }
  }

  public getEquipmentDescription(item: IEquipmentStoreItem): string {
    const map =
      item.equipmentType == EquipmentTypeEnum.Armor
        ? EQUIPMENT_MAPS[item.armorType]
        : EQUIPMENT_MAPS[item.weaponType];
    return map.description;
  }

  // #region ControlValueAccessor
  onChange: (equipment: string[] | undefined) => undefined = (_) => undefined;
  onTouched: () => undefined = () => undefined;
  touched: boolean = false;
  disabled: boolean = false;

  writeValue(equipment: string[] | undefined): void {
    this.Equipment = equipment;
  }
  registerOnChange(fn: (equipment: string[] | undefined) => undefined): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => undefined): void {
    this.onTouched = fn;
  }
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(_: AbstractControl<unknown, unknown>): ValidationErrors | null {
    return null;
  }
  // #endregion ControlValueAccessor
}
