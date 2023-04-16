import { Component, Input, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MaterialsService } from '@app/core/services/materials.service';
import { HunterMaterials } from '@app/core/types/HunterMaterials';
import { Material } from '@app/core/types/Material';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MaterialListComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: MaterialListComponent,
    },
  ],
})
export class MaterialListComponent implements ControlValueAccessor, Validator {
  @Input() public Materials: HunterMaterials[] = [];
  @Output('MaterialsChange') public MaterialsChange$ = new Subject<
    HunterMaterials[]
  >();

  @Input() public ShowControls: boolean = false;

  constructor(private _materialService: MaterialsService) {}

  public getMaterial(materialId: string): Observable<Material | undefined> {
    return this._materialService.FindMaterialById(materialId);
  }

  public IncrementMaterial(item: HunterMaterials) {
    if (!this.disabled) {
      this._changeMaterialCount(item.materialId, 1);
    }
  }

  public DecrementMaterial(item: HunterMaterials) {
    if (!this.disabled) {
      this._changeMaterialCount(item.materialId, -1);
    }
  }

  private _changeMaterialCount(materialId: string, delta: number): void {
    const ind = this.Materials.findIndex((x) => x.materialId == materialId);
    const newMaterials = [...this.Materials];
    if (ind > -1) {
      newMaterials[ind] = {
        ...this.Materials[ind],
        count: Math.max(this.Materials[ind].count + delta, 0),
      };
      this.Materials = newMaterials;
      this.MaterialsChange$.next(this.Materials);
      this.onChange(this.Materials);
    }
  }

  public RemoveMaterial(item: HunterMaterials) {
    if (!this.disabled) {
      const ind = this.Materials.findIndex(
        (x) => x.materialId == item.materialId
      );
      this.Materials.splice(ind, 1);
      this.Materials = [...this.Materials]; // Force change detection for regular bindings
      this.MaterialsChange$.next(this.Materials);
      this.onChange(this.Materials);
    }
  }

  // #region CONTROL VALUE ACCESSOR / VALIDATOR

  onChange: (materials: HunterMaterials[]) => undefined = (_) => undefined;
  onTouched: () => undefined = () => undefined;
  touched: boolean = false;
  disabled: boolean = false;

  writeValue(materials: HunterMaterials[]): void {
    this.Materials = materials;
    this.MaterialsChange$.next(this.Materials);
  }
  registerOnChange(fn: (materials: HunterMaterials[]) => undefined): void {
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

  // #endregion
}
