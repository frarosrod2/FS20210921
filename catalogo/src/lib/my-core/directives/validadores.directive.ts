import { Directive, ElementRef, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function NotBlankValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
     return control.value?.trim() ? null : { notblank: 'No puede estar en blanco' }
  };
}

@Directive({
  selector: '[notblank]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NotBlankValidator, multi: true }]
})
export class NotBlankValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return NotBlankValidation()(control);
  }
}

export function IsNumberValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
     return isNaN(control.value) ? { isnumber: 'No es un número' } : null
  };
}

@Directive({
  selector: '[isnumber][formControlName],[isnumber][formControl],[isnumber][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IsNumberValidator, multi: true }]
})
export class IsNumberValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return IsNumberValidation()(control);
  }
}


export const MIS_VALIDADORES = [NotBlankValidator, IsNumberValidator];
