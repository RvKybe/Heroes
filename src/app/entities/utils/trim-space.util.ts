import {FormControl} from "@angular/forms";

/**
 * Контролирует пробелы в инпуте
 * @param {FormControl} nameControl - контроллер формы (поле ввода имени)
 */
export function trimSpace(nameControl: FormControl): void {
    if (nameControl.value.trim() === '') {
        nameControl.setValue('', {emitEvent: false});
        return;
    }
    if (nameControl.value.length > 1 && nameControl.value.at(-1) === ' ' && nameControl.value.at(-2) === ' ') { // Убирает повторный пробел при вводе
        nameControl.setValue(nameControl.value.slice(0, -1), {emitEvent: false});
    }
}