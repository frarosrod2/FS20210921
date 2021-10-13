import { Directive, ElementRef, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function UppercaseValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    return control.value === control.value.toUpperCase()
      ? null
      : { uppercase: 'Tiene que estar en mayúsculas' };
  };
}

@Directive({
  selector: '[uppercase]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: UppercaseValidator, multi: true },
  ],
})
export class UppercaseValidator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    return UppercaseValidation()(control);
  }
}

const ibanRegexThroughCountryCode: { [key: string]: RegExp } = {
  AD: /^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,
  AE: /^(AE[0-9]{2})\d{3}\d{16}$/,
  AL: /^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,
  AT: /^(AT[0-9]{2})\d{16}$/,
  AZ: /^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  BA: /^(BA[0-9]{2})\d{16}$/,
  BE: /^(BE[0-9]{2})\d{12}$/,
  BG: /^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
  BH: /^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,
  BR: /^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,
  BY: /^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  CH: /^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,
  CR: /^(CR[0-9]{2})\d{18}$/,
  CY: /^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,
  CZ: /^(CZ[0-9]{2})\d{20}$/,
  DE: /^(DE[0-9]{2})\d{18}$/,
  DK: /^(DK[0-9]{2})\d{14}$/,
  DO: /^(DO[0-9]{2})[A-Z]{4}\d{20}$/,
  EE: /^(EE[0-9]{2})\d{16}$/,
  EG: /^(EG[0-9]{2})\d{25}$/,
  ES: /^(ES[0-9]{2})\d{20}$/,
  FI: /^(FI[0-9]{2})\d{14}$/,
  FO: /^(FO[0-9]{2})\d{14}$/,
  FR: /^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  GB: /^(GB[0-9]{2})[A-Z]{4}\d{14}$/,
  GE: /^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,
  GI: /^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,
  GL: /^(GL[0-9]{2})\d{14}$/,
  GR: /^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,
  GT: /^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,
  HR: /^(HR[0-9]{2})\d{17}$/,
  HU: /^(HU[0-9]{2})\d{24}$/,
  IE: /^(IE[0-9]{2})[A-Z0-9]{4}\d{14}$/,
  IL: /^(IL[0-9]{2})\d{19}$/,
  IQ: /^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,
  IR: /^(IR[0-9]{2})0\d{2}0\d{18}$/,
  IS: /^(IS[0-9]{2})\d{22}$/,
  IT: /^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
  JO: /^(JO[0-9]{2})[A-Z]{4}\d{22}$/,
  KW: /^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,
  KZ: /^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,
  LB: /^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,
  LC: /^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,
  LI: /^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,
  LT: /^(LT[0-9]{2})\d{16}$/,
  LU: /^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,
  LV: /^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,
  MC: /^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  MD: /^(MD[0-9]{2})[A-Z0-9]{20}$/,
  ME: /^(ME[0-9]{2})\d{18}$/,
  MK: /^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,
  MR: /^(MR[0-9]{2})\d{23}$/,
  MT: /^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
  MU: /^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
  MZ: /^(MZ[0-9]{2})\d{21}$/,
  NL: /^(NL[0-9]{2})[A-Z]{4}\d{10}$/,
  NO: /^(NO[0-9]{2})\d{11}$/,
  PK: /^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,
  PL: /^(PL[0-9]{2})\d{24}$/,
  PS: /^(PS[0-9]{2})[A-Z0-9]{4}\d{21}$/,
  PT: /^(PT[0-9]{2})\d{21}$/,
  QA: /^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
  RO: /^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,
  RS: /^(RS[0-9]{2})\d{18}$/,
  SA: /^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,
  SC: /^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
  SE: /^(SE[0-9]{2})\d{20}$/,
  SI: /^(SI[0-9]{2})\d{15}$/,
  SK: /^(SK[0-9]{2})\d{20}$/,
  SM: /^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
  SV: /^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  TL: /^(TL[0-9]{2})\d{19}$/,
  TN: /^(TN[0-9]{2})\d{20}$/,
  TR: /^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,
  UA: /^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,
  VA: /^(VA[0-9]{2})\d{18}$/,
  VG: /^(VG[0-9]{2})[A-Z0-9]{4}\d{16}$/,
  XK: /^(XK[0-9]{2})\d{16}$/,
};

/**
 * Check whether string has correct universal IBAN format
 * The IBAN consists of up to 34 alphanumeric characters, as follows:
 * Country Code using ISO 3166-1 alpha-2, two letters
 * check digits, two digits and
 * Basic Bank Account Number (BBAN), up to 30 alphanumeric characters.
 * NOTE: Permitted IBAN characters are: digits [0-9] and the 26 latin alphabetic [A-Z]
 *
 * @param {string} str - string under validation
 * @return {boolean}
 */
function hasValidIbanFormat(str: string) {
  // Strip white spaces and hyphens
  const strippedStr = str.replace(/[\s\-]+/gi, '').toUpperCase();
  const isoCountryCode = strippedStr.slice(0, 2).toUpperCase();

  return (
    isoCountryCode in ibanRegexThroughCountryCode &&
    ibanRegexThroughCountryCode[isoCountryCode].test(strippedStr)
  );
}

/**
 * Check whether string has valid IBAN Checksum
 * by performing basic mod-97 operation and
 * the remainder should equal 1
 * -- Start by rearranging the IBAN by moving the four initial characters to the end of the string
 * -- Replace each letter in the string with two digits, A -> 10, B = 11, Z = 35
 * -- Interpret the string as a decimal integer and
 * -- compute the remainder on division by 97 (mod 97)
 * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
 *
 * @param {string} str
 * @return {boolean}
 */
function hasValidIbanChecksum(str: string) {
  const strippedStr = str.replace(/[^A-Z0-9]+/gi, '').toUpperCase(); // Keep only digits and A-Z latin alphabetic
  const rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
  const alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, (char) =>
    (char.charCodeAt(0) - 55).toString()
  );

  const remainder = alphaCapsReplacedWithDigits
    .match(/\d{1,7}/g)
    ?.reduce((acc, value) => Number(acc + value) % 97, 0);
  return remainder === 1;
}

export function isIBAN(str: string) {
  return hasValidIbanFormat(str) && hasValidIbanChecksum(str);
}

export function IBANValidation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    return isIBAN(control.value) ? null : { iban: 'No es un IBAN valido' };
  };
}

@Directive({
  selector: '[iban][formControlName],[iban][formControl],[iban][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: IBANValidator, multi: true },
  ],
})
export class IBANValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return IBANValidation()(control);
  }
}

export function NIFValidation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }
    const err = {
      nif: {
        invalidFormat: true,
        invalidChar: true,
        message: 'No es un NIF valido',
      },
    };
    if (/^\d{1,8}\w$/.test(control.value)) {
      const letterValue = control.value.substr(control.value.length - 1);
      const numberValue = control.value.substr(0, control.value.length - 1);
      err.nif.invalidFormat = false;
      return letterValue.toUpperCase() ===
        'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numberValue % 23)
        ? null
        : err;
    } else {
      return err;
    }
  };
}
@Directive({
  selector: '[nif][formControlName],[nif][formControl],[nif][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NIFValidator, multi: true },
  ],
})
export class NIFValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return NIFValidation()(control);
  }
}

@Directive({
  selector: '[type][formControlName],[type][formControl],[type][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TypeValidator, multi: true },
  ],
})
export class TypeValidator implements Validator {
  constructor(private elem: ElementRef) {}
  validate(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (valor) {
      const dom = this.elem.nativeElement;
      if (dom.validity) {
        // dom.checkValidity();
        return dom.validity.typeMismatch
          ? { type: dom.validationMessage }
          : null;
      }
    }
    return null;
  }
}

export function ExcludeValidation(start: any, end: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) { return null; }
    if(!start) throw new Error("Falta el valor de inicio del rango")
    if(!end) throw new Error("Falta el valor de finalización del rango")
    return control.value < (start) || (control.value) > (end) ? null : { exclude: `Tiene que ser menor que ${start} o mayor que ${end}` }
  };
}

@Directive({
  selector: '[exclude-start][formControlName],[exclude-start][formControl],[exclude-start][ngModel],[formControlName],[exclude-end][formControl],[exclude-end][ngModel]',
//  selector: '[exclude-start][exclude-end][formControlName],[exclude-start][exclude-end][formControl],[exclude-start][exclude-end][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ExcludeValidator, multi: true }]
})
export class ExcludeValidator implements Validator {
  @Input('exclude-start') start: any;
  @Input('exclude-end') end: any;
  validate(control: AbstractControl): ValidationErrors | null {
    return ExcludeValidation(this.start, this.end)(control);
  }
}

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


export const MIS_VALIDADORES = [IBANValidator, UppercaseValidator, NIFValidator, TypeValidator, ExcludeValidator, NotBlankValidator, IsNumberValidator];
