import {Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl} from '@angular/forms';

import {AbstractControlValueAccessor, getRef} from '../abstract-control-value-accesor';
import {IDynamicElementConfig, DynamicFormsService} from '../../services/dynamic-forms.service';

const INPUT_INPUT_CONTROL_VALUE_ACCESSOR = getRef(DynamicCheckboxComponent);

@Component({providers: [INPUT_INPUT_CONTROL_VALUE_ACCESSOR], selector: 'td-dynamic-checkbox', templateUrl: './checkbox.component.html'})
export class DynamicCheckboxComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
				control : FormControl;
}
