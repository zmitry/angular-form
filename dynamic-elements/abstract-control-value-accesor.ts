import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnInit, forwardRef } from '@angular/core';
import { IDynamicElementConfig, DynamicFormsService } from '../services/dynamic-forms.service';

const noop: any = () => {
  // empty method
};

export const getRef = (el) => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => el),
  multi: true
});

export abstract class AbstractControlValueAccessor implements ControlValueAccessor, OnInit {


  /**
   * Implemented as part of ControlValueAccessor.
   */
  protected _value: any = undefined;

  // get/set accessor (needed for ControlValueAccessor)
  get value(): any { return this._value; };
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange = (_: any) => noop;
  onTouched = () => noop;

  config: IDynamicElementConfig;

  ngOnInit() {

  }
}
