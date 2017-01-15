import { Injectable } from '@angular/core';
import { Validators, ValidatorFn, FormControl, FormArray, FormGroup } from '@angular/forms';
import { DynamicInputComponent } from '../dynamic-elements/dynamic-input/dynamic-input.component';
import { DynamicTextareaComponent } from '../dynamic-elements/dynamic-textarea/dynamic-textarea.component';
import { TdDynamicArrayComponent } from '../dynamic-elements/array/array.component';
import { DynamicGroupComponent } from '../dynamic-elements/group/group.component';
import { SelectComponent } from '../dynamic-elements/mutliselect/mutliselect.component';
import { DynamicCheckboxComponent } from '../dynamic-elements/checkbox/checkbox.component';


export enum DynamicElement {
  Input = <any>'input',
  Checkbox = <any>'checkbox',
  Select = <any>'select',
  Color = <any>'color',
  MultiLine = <any>'multiline',
  File = <any>'file',
  Array = <any>'array',
  Group = <any>'group',
}


interface IGroupMetaConfig{
  propertiesType: IDynamicElementConfig[]
}
interface IArrayMetaConfig {
  elementsType: IDynamicElementConfig
  defaultValueOnPush: any
}
interface IInputMetaConfig {
  inputType: string,
  placeholder: string,
  max?: any,
  min?: any,
  selections?: any[]
}

export interface IDynamicElementConfig {
  label?: string;
  className?: string,
  name: string;
  type:  DynamicElement;
  meta?: any,
  validators?:ValidatorFn,
  default?: any;
  onInit?:(...a)=>any
}

export const DYNAMIC_ELEMENT_NAME_REGEX: RegExp = /^[a-zA-Z]+[a-zA-Z0-9-_]*$/;

@Injectable()
export class DynamicFormsService {

  /**
   * Method to validate if the [name] is a proper element name.
   * Throws error if name is not valid.
   */
  validateDynamicElementName(name: string): void {
    if (!DYNAMIC_ELEMENT_NAME_REGEX.test(name)) {
      throw `Dynamic element name: "${name}" is not valid.`;
    }
  }

  /**
   * Gets component to be rendered depending on [TdDynamicElement | TdDynamicType]
   * Throws error if it does not exists or not supported.
   */
  getDynamicElement(element: DynamicElement): any {
    switch (element) {
      case DynamicElement.Select:
          return SelectComponent;
      case DynamicElement.Input:
        return DynamicInputComponent;
      case DynamicElement.Array:
        return TdDynamicArrayComponent;
      case DynamicElement.Group:
        return DynamicGroupComponent;
      case DynamicElement.Checkbox:
        return DynamicCheckboxComponent
      default:
        throw `Error: type ${element} does not exist or not supported.`;
    }
  }

  /**
   * Gets default flex for element depending on [TdDynamicElement | TdDynamicType].
   * Throws error if it does not exists or not supported.
   */
  getDefaultElementFlex(element: DynamicElement): any {
    switch (element) {
      case DynamicElement.Input:
      case DynamicElement.Array:
        return 45;
      case DynamicElement.Group:
        return 95;
      default:
        throw `Error: type ${element} does not exist or not supported.`;
    }
  }


  /**
   * Creates form control for element depending [ITdDynamicElementConfig] properties.
   */
  createFormControl(config: IDynamicElementConfig): FormControl | FormArray | FormGroup {
    let validator: ValidatorFn = this.createValidators(config);

    if (config.type === DynamicElement.Array) {
        const configMeta = <IArrayMetaConfig>config.meta;
        const controls = config.default.map((el,i) => this.createFormControl(Object.assign({ }, configMeta.elementsType, { default : el })));
        return   new FormArray(controls, validator);
    }
    if (config.type === DynamicElement.Group) {
      const configMeta = <IGroupMetaConfig>config.meta;
      const controls = {};
      configMeta.propertiesType.forEach(el => {
        const defaultVal = config.default ? { default: config.default[el.name] }:{};
        const type = Object.assign({}, defaultVal, el);
        controls[el.name] = this.createFormControl(type);
      });
      return new FormGroup(controls, validator);
    }
    return new FormControl(config.default, validator);
  }

  /**
   * Creates form validationdepending [ITdDynamicElementConfig] properties.
   */
  createValidators(config: IDynamicElementConfig): ValidatorFn {
    return config.validators;
  }
}
