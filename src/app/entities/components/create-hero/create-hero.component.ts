import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup,} from "@angular/forms";
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {IHero} from "../../interfaces/hero.interface";
import {Observable} from "rxjs";
import {LHero} from "../../labels/hero.label";
import {FormBuilderService} from "../../services/form-builder.service";
import {EDialogMode} from "../../enums/dialog-mode.enum";
import {LItem} from "../../labels/item.label";
import {IItem} from "../../interfaces/item.interface";
import {EErrorMessages} from "../../enums/error-messages.enum";

@Component({
    selector: 'app-create-hero',
    templateUrl: './create-hero.component.html',
    styleUrls: ['./create-hero.component.scss']
})
export class CreateHeroComponent implements OnInit {
    @Input({'required': true})
    public mode: string = '';

    @Input()
    public hero: IHero | null = null;

    public form: FormGroup = this._formBuilderService.heroForm;

    public abilities$: Observable<IItem[]> = this._manageAbilitiesService.abilities$;
    public submitButtonText: string = '';
    public errorMessage: string = '';

    constructor(
        private readonly _manageHeroesService: ManageHeroesService,
        private readonly _manageAbilitiesService: ManageAbilitiesService,
        private readonly _formBuilderService: FormBuilderService,
    ) {
    }

    public ngOnInit(): void {
        if (this.mode === EDialogMode.CREATE) {
            this.submitButtonText = 'Создать героя';
        } else if (this.mode === EDialogMode.EDIT) {
            this.submitButtonText = 'Изменить героя';
            this.form.patchValue(<IHero>this.hero);
        }
    }

    /**
     * Функция отправки формы
     */
    public submit(): void {
        const hero: IHero = <IHero>this.form.value;
        this.errorMessage = '';
        const heroId: number | null = this.hero ? <number>this.hero[LItem.ID] : null;
        const hasDuplicate: boolean = this._manageHeroesService.hasDuplicate(hero[LItem.NAME], heroId);
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        if (hasDuplicate) {
            this.errorMessage = EErrorMessages.HERO_EXIST;
            return;
        }
        if (this.mode === EDialogMode.CREATE) {
            this._manageHeroesService.add(hero);
        } else if (this.mode === EDialogMode.EDIT) {
            this._manageHeroesService.edit(hero);
        }
        this.form.reset();
    }

    /**
     * Возвращает контроллер name формы
     *
     * return {FormControl<string | null>}
     */
    public get nameFormControl(): FormControl<string | null> {
        return this.form.get(LItem.NAME) as FormControl<string | null>;
    }

    /**
     * Возвращает контроллер power формы
     *
     * return {FormControl<string | null>}
     */
    public get powerFormControl(): FormControl<number | null> {
        return this.form.get(LHero.POWER) as FormControl<number | null>;
    }

    /**
     * Возвращает контроллер abilities формы
     *
     * return {FormControl<string | null>}
     */
    public get abilityFormControl(): FormControl<number[] | null> {
        return this.form.get(LHero.ABILITY_IDS) as FormControl<number[] | null>;
    }

    /**
     * Возвращает контроллер level формы
     *
     * return {FormControl<string | null>}
     */
    public get levelFormControl(): FormControl<number | null> {
        return this.form.get(LHero.LEVEL) as FormControl<number | null>;
    }
}
