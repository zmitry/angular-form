import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const TEXTAREA_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DynamicTextareaComponent),
  multi: true,
};

@Component({
  providers: [ TEXTAREA_INPUT_CONTROL_VALUE_ACCESSOR ],
  selector: 'td-dynamic-textarea',
  templateUrl: './dynamic-textarea.component.html',
})
export class DynamicTextareaComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

  control: FormControl;

  label: string = '';

  required: boolean = undefined;

}
