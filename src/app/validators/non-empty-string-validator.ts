import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

/**
 * Функция-валидатор значения формы. Проверяет значение на число
 * return {ValidatorFn}
 */
export function nonEmptyStringValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value?.trim() === '' ?  {emptyString: {value: control.value}} : null ;
    };
}
