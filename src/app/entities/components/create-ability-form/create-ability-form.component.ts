import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {FormBuilderService} from "../../services/form-builder.service";
import {trimSpace} from "../../utils/trim-space.util";

@Component({
    selector: 'app-create-ability-form',
    templateUrl: './create-ability-form.component.html',
    styleUrls: ['./create-ability-form.component.scss']
})
export class CreateAbilityFormComponent {
    public abilityNameFormControl: FormControl<string | null> = this._formBuilderService.createAbilityFormControl;

    public errorMessage: string = '';

    constructor(
        private readonly _manageAbilitiesServices: ManageAbilitiesService,
        private readonly _formBuilderService: FormBuilderService,
    ) {
    }

    /**
     * Передаёт контроллер формы в сервис по обработке пробелов
     * @param {FormControl} nameControl - контроллер формы (поле ввода имени)
     */
    public firstSpace(nameControl: FormControl): void {
        trimSpace(nameControl);
    }

    /**
     * Функция создания способности героя.
     */
    public createAbility(): void {
        this.errorMessage = '';
        if (this.abilityNameFormControl.invalid) {
            this.abilityNameFormControl.markAsTouched();
            return;
        }
        const abilityName: string = <string>this.abilityNameFormControl.value;
        const hasDuplicate: boolean = this._manageAbilitiesServices.hasDuplicate(abilityName);
        if (!hasDuplicate) {
            this._manageAbilitiesServices.add(abilityName);
            this.abilityNameFormControl.reset();
        } else {
            this.errorMessage = 'Такая способность уже существует';
        }
    }
}
