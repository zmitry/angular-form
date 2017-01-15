import {Component, forwardRef, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormArray, FormGroup} from '@angular/forms';

import {AbstractControlValueAccessor} from '../abstract-control-value-accesor';
import { IDynamicElementConfig, DynamicFormsService } from '../../services/dynamic-forms.service';

export const GROUP_INPUT_CONTROL_VALUE_ACCESSOR : any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DynamicGroupComponent),
  multi: true
};

@Component({selector: 'td-dynamic-group', templateUrl: './group.component.html'})
export class DynamicGroupComponent extends AbstractControlValueAccessor
implements ControlValueAccessor {

  control : FormGroup;

}
