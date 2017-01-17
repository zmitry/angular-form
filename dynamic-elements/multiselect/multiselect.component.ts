import {Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl} from '@angular/forms';

import { AbstractControlValueAccessor, getRef } from '../abstract-control-value-accesor';
import {IDynamicElementConfig, DynamicFormsService} from '../../services/dynamic-forms.service';



@Component({providers: [getRef(DynamicSelectComponent)], selector: 'td-dynamic-select', templateUrl: './multiselect.component.html'})
export class DynamicSelectComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
  control : FormControl;
}
