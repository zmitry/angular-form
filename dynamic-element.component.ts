import { Component, Directive, Input, HostBinding, OnInit } from '@angular/core';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFactoryResolver, ComponentRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { DynamicElement, DynamicFormsService, IDynamicElementConfig } from './services/dynamic-forms.service';
import { AbstractControlValueAccessor } from './dynamic-elements/abstract-control-value-accesor';

const noop: any = () => {
  // empty method
};

export const ELEMENT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DynamicElementComponent),
  multi: true,
};

@Directive({
  selector: '[tdDynamicContainer]',
})
export class TdDynamicElementDirective {
  constructor(public viewContainer: ViewContainerRef) { }
}

@Component({
  providers: [ DynamicFormsService, ELEMENT_INPUT_CONTROL_VALUE_ACCESSOR ],
  selector: 'td-dynamic-element',
  template: '<div tdDynamicContainer></div>',
})
export class DynamicElementComponent extends AbstractControlValueAccessor
                                       implements ControlValueAccessor, OnInit {

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
      this.onModelChange(v);
    }
  }

  /**
   * Sets form control of the element.
   */
  @Input() dynamicControl: FormControl;

  @Input() config:IDynamicElementConfig = undefined;


  @ViewChild(TdDynamicElementDirective) childElement: TdDynamicElementDirective;

  @HostBinding('attr.flex')
  get flex(): any {
    if (this.config.type) {
      return this._dynamicFormsService.getDefaultElementFlex(this.config.type);
    }
    return true;
  }

  @HostBinding('attr.max')
  get maxAttr(): any {
    return this.config.type;
  }

  @HostBinding('attr.min')
  get minAttr(): any {
    return this.config.type;
  }

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _dynamicFormsService: DynamicFormsService,public fs : DynamicFormsService) {
                super();
  }
  ngOnInit(): void {
    this.config.onInit&&this.config.onInit(this);

    let ref: ComponentRef<any> = this._componentFactoryResolver.
      resolveComponentFactory(this._dynamicFormsService.getDynamicElement(this.config.type))
      .create(this.childElement.viewContainer.injector);
    this.childElement.viewContainer.insert(ref.hostView);
    ref.instance.control = this.dynamicControl;
    ref.instance.config = this.config;
    ref.instance.label = this.config.label;
    ref.instance.type = this.config.type;
    ref.instance._value = this._value;
    ref.instance.fs = this.fs;
    ref.instance.registerOnChange((value: any) => {
      this.value = value;
    });
    this.registerOnModelChange((value: any) => {
      // fix to check if value is NaN (type=number)
      if (!Number.isNaN(value)) {
        ref.instance.value = value;
      }
    });
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  registerOnModelChange(fn: any): void {
    this.onModelChange = fn;
  }

  onModelChange = (_: any) => noop;
}