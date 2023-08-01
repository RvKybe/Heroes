import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

/**
 * Функция-валидатор значения формы. Проверяет значение на число
 * return {ValidatorFn}
 */
export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return Number(control.value) > 0 ? null : {notNumber: {value: control.value}};
  };
}
