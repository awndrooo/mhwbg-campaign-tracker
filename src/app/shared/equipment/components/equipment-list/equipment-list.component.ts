import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  forwardRef,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EquipmentService } from '@app/core/services/equipment.service';
import { EQUIPMENT_MAPS } from '@app/core/types/EquipmentMap';
import { EquipmentTypeEnum } from '@app/core/types/EquipmentType';
import { filterNullish } from '@app/core/utility/FilterNullish';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { RichTextComponent } from '@shared/components';
import { ReplaySubject, Subject, switchMap } from 'rxjs';
import { EquipmentIconComponent } from '../equipment-icon/equipment-icon.component';

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
  imports: [
    MatTableModule,
    MatSortModule,
    EquipmentIconComponent,
    MatTooltipModule,
    MatIconModule,
    RichTextComponent,
    MatMenuModule,
    MatButtonModule,
  ],
})
export class EquipmentListComponent implements ControlValueAccessor {
  private _equipment: string[] | undefined;
  public get Equipment(): string[] | undefined {
    return this._equipment;
  }
  @Input()
  public set Equipment(value: string[] | undefined) {
    this._equipment = value ? [...value] : value;
    this._equipment$.next(value);
  }

  private _AttachedEquipment = signal<string[]>([]);
  @Input()
  public get AttachedEquipment(): string[] {
    return this._AttachedEquipment();
  }
  public set AttachedEquipment(value: string[]) {
    this._AttachedEquipment.set(value);
  }

  private _ShowControls = signal(false);
  @Input()
  public get ShowControls(): boolean {
    return this._ShowControls();
  }
  public set ShowControls(value: boolean | string | null) {
    this._ShowControls.set(coerceBooleanProperty(value));
  }

  private _Columns = signal<COLUMN_NAMES[]>([
    'Type',
    'Name',
    'Notes',
    'CardNumber',
    'Description',
  ]);
  @Input()
  public get Columns(): COLUMN_NAMES[] {
    return this._Columns();
  }
  public set Columns(value: COLUMN_NAMES[]) {
    this._Columns.set(value);
  }
  protected __computedColumns = computed(() =>
    (this._ShowControls() ? ['control'] : []).concat(this._Columns())
  );

  @Output('EquipmentChange') public EquipmentChange$ = new Subject<
    string[] | undefined
  >();

  @Output() public EquipmentAttached = new EventEmitter<IEquipmentStoreItem>();

  private _equipment$ = new ReplaySubject<string[] | undefined>();
  public Equipment$ = this._equipment$.pipe(
    filterNullish(),
    switchMap((x) => this._equipmentService.FindEquipmentByIds(x))
  );

  constructor(private _equipmentService: EquipmentService) {}

  protected __itemIsEquiped = (item: IEquipmentStoreItem) =>
    computed(() => this._AttachedEquipment().includes(item.id));

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
