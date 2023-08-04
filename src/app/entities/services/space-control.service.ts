import {Injectable} from "@angular/core";
import {FormControl} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class spaceControlService {
    /**
     * Функция, контролирующая пробелы в инпуте
     *
     * @param {FormControl} nameControl
     */
    public spaceControl(nameControl: FormControl): void {
        if (nameControl.value.trim() === '') {
            nameControl.patchValue('');
            return;
        }
        if (nameControl.value.length > 1 && nameControl.value.at(-1) === ' ' && nameControl.value.at(-2) === ' ') {
            nameControl.patchValue(nameControl.value.slice(0, -1));
        }
    }
}