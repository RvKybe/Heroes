import {FormControl} from "@angular/forms";

/**
 * Контролирует пробелы в инпуте
 *
 * @param {FormControl} nameControl - контроллер формы (поле ввода имени)
 */
export function trimSpace(nameControl: FormControl): void {
    if (nameControl.value.trim() === '') {
        nameControl.patchValue('');
        return;
    }
    if (nameControl.value.length > 1 && nameControl.value.at(-1) === ' ' && nameControl.value.at(-2) === ' ') {
        nameControl.patchValue(nameControl.value.slice(0, -1));
    }
}