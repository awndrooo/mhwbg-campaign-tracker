import { Component, Input, Output, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { EquipmentService } from '@app/core/services/equipment.service';
import { filterNullish } from '@app/core/utility/FilterNullish';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { Subject, switchMap } from 'rxjs';

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
  @Output('EquipmentChange') public EquipmentChange$ = new Subject<
    string[] | undefined
  >();

  private _equipment$ = new Subject<string[] | undefined>();
  public Equipment$ = this._equipment$.pipe(
    filterNullish(),
    switchMap((x) => this._equipmentService.FindEquipmentByIds(x))
  );

  constructor(private _equipmentService: EquipmentService) {}

  public RemoveEquipment(item: IEquipmentStoreItem) {
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
