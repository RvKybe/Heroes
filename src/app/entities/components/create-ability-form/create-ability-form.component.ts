import {Component, DestroyRef, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {FormBuilderService} from "../../services/form-builder.service";
import {trimSpace} from "../../utils/trim-space.util";
import {EErrorMessage} from "../../enums/error-message.enum";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-create-ability-form',
    templateUrl: './create-ability-form.component.html',
    styleUrls: ['./create-ability-form.component.scss']
})
export class CreateAbilityFormComponent implements OnInit {
    public abilityNameFormControl: FormControl<string | null> = this._formBuilderService.createAbilityFormControl;

    public errorMessage: string = '';

    constructor(
        private readonly _manageAbilitiesService: ManageAbilitiesService,
        private readonly _formBuilderService: FormBuilderService,
        private readonly _destroyRef: DestroyRef
    ) {
    }

    public ngOnInit(): void {
        this.abilityNameFormControl.valueChanges.pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                trimSpace(this.abilityNameFormControl);
            })
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
        const hasDuplicate: boolean = this._manageAbilitiesService.abilityHasDuplicate(abilityName);
        if (!hasDuplicate) {
            this._manageAbilitiesService.addAbility(abilityName);
            this.abilityNameFormControl.reset();
        } else {
            this.errorMessage = EErrorMessage.ABILITY_EXIST;
        }
    }
}
