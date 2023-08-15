import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {FormBuilderService} from "../../services/form-builder.service";
import {trimSpace} from "../../utils/trim-space.util";
import {EErrorMessage} from "../../enums/error-message.enum";

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
    public trimSpace(nameControl: FormControl): void {
        trimSpace(nameControl);
    }

    /**
     * Создаёт способность героя
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
            this.errorMessage = EErrorMessage.ABILITY_EXIST;
        }
    }
}
