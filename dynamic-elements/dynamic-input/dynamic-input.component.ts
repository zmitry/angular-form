import {Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl} from '@angular/forms';

import {AbstractControlValueAccessor} from '../abstract-control-value-accesor';
import {IDynamicElementConfig, DynamicFormsService} from '../../services/dynamic-forms.service';

export const INPUT_INPUT_CONTROL_VALUE_ACCESSOR : any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DynamicInputComponent),
  multi: true
};

@Component({providers: [INPUT_INPUT_CONTROL_VALUE_ACCESSOR], selector: 'td-dynamic-input', templateUrl: './dynamic-input.component.html'})
export class DynamicInputComponent extends AbstractControlValueAccessor implements ControlValueAccessor {


  control : FormControl;
}
