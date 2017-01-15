import { Component, forwardRef, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormArray } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';
import { IDynamicElementConfig, DynamicFormsService, DynamicElement } from '../../services/dynamic-forms.service';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';

export const ARRAY_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TdDynamicArrayComponent),
  multi: true,
};

@Component({
  providers: [ ARRAY_INPUT_CONTROL_VALUE_ACCESSOR, ],
  selector: 'td-dynamic-array',
  templateUrl: './array.component.html',
  styleUrls: [ './array.component.css' ]
})
export class TdDynamicArrayComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
  control: FormArray;
  fs : DynamicFormsService

  pushElement(type) {
    const res = Object.assign({}, type, { default: this.config.meta.defaultValueOnPush });
    this.control.push(this.fs.createFormControl(res))
  }
  popElementAt(i) {
    this.control.removeAt(i);
  }

  ngOnInit(){
  }


}
