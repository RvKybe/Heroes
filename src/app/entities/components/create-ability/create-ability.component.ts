import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {FormBuilderService} from "../../services/form-builder.service";
import {TestService} from "../../services/test.service";

@Component({
    selector: 'app-create-ability',
    templateUrl: './create-ability.component.html',
    styleUrls: ['./create-ability.component.scss']
})
export class CreateAbilityComponent {
    public abilityNameFormControl: FormControl<string | null> = this._formBuilderService.createAbilityFormControl;

    public errorMessage: string = '';

    constructor(
        private readonly _manageAbilitiesServices: ManageAbilitiesService,
        private readonly _formBuilderService: FormBuilderService,
        private readonly _testService: TestService,
    ) {
    }

    public firstSpace(nameControl: FormControl): void {
        this._testService.firstSpace(nameControl);
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

    /**
     * Возвращает валидность контроллера формы
     * return {boolean}
     */
    public get formControlInvalid(): boolean {
        return this.abilityNameFormControl.invalid;
    }
}
