import {
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CounterComponent,
    },
  ],
})
export class CounterComponent
  implements MatFormFieldControl<number>, ControlValueAccessor, OnDestroy
{
  private _value: number | null = null;
  public get value(): number | null {
    return this._value;
  }
  public set value(value: number | null) {
    this._value = coerceNumberProperty(value);
    this._stateChanges.next();
  }

  touched: boolean = false;
  onTouched: () => undefined = () => undefined;
  onChange: (value: number | null) => undefined = () => undefined;
  @HostBinding('class.focused') focused: boolean = false;
  static nextId = 0;
  @HostBinding() id = `app-counter-${CounterComponent.nextId++}`;

  // DISABLED
  private _disabled: boolean = false;
  public get disabled(): boolean {
    return this._disabled;
  }
  @Input()
  public set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  // MINVALUE
  private _minValue: number = 0;
  public get minValue(): number {
    return this._minValue;
  }
  @Input()
  public set minValue(value: number) {
    this._minValue = coerceNumberProperty(value);
  }

  // REQUIRED
  private _required: boolean = false;
  public get required(): boolean {
    return this._required;
  }
  @Input()
  public set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  private _stateChanges = new Subject<void>();
  public get stateChanges(): Observable<void> {
    return this._stateChanges.asObservable();
  }

  @Input() public placeholder: string = '#';

  @HostBinding('class.empty') get empty() {
    return this.value == null || this.value == undefined;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get errorState(): boolean {
    return <boolean>this.ngControl.invalid && this.touched;
  }
  controlType?: string | undefined = 'app-counter';
  autofilled?: boolean | undefined;
  @Input('aria-describedby') userAriaDescribedBy: string = '';

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _elementRef: ElementRef
  ) {
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy(): void {
    this._stateChanges.complete();
  }

  incrementValue(): void {
    if (this.value == null) this.value = 1;
    this.value++;
    this.onChange(this.value);
  }

  decrementValue(): void {
    if (this.value == null) this.value = 0;
    this.value = Math.max(this.value - 1, this.minValue);
    this.onChange(this.value);
  }

  // #region MatFormFieldControl
  onFocusIn(_: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this._stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this._stateChanges.next();
    }
  }

  setDescribedByIds(ids: string[]): void {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.app-counter-container'
    );
    if (controlElement != null) {
      controlElement.setAttribute('aria-describedby', ids.join(' '));
    }
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input').focus();
    }
  }
  // #endregion MatFormFieldControl

  // #region ControlValueAccessor
  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => undefined): void {
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
  // #endregion ControlValueAccessor
}
