import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup,} from "@angular/forms";
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {IHero} from "../../interfaces/hero.interface";
import {Observable, Subscription} from "rxjs";
import {LHero} from "../../labels/hero.label";
import {FormBuilderService} from "../../services/form-builder.service";
import {EDialogMode} from "../../enums/dialog-mode.enum";
import {LItem} from "../../labels/item.label";
import {IItem} from "../../interfaces/item.interface";
import {EErrorMessages} from "../../enums/error-messages.enum";
import {spaceControlService} from "../../services/space-control.service";
import {FilterFormService} from "../../services/filter-form.service";
import {IFilterForm} from "../../interfaces/filter-form.interface";

@Component({
    selector: 'app-create-hero',
    templateUrl: './create-hero.component.html',
    styleUrls: ['./create-hero.component.scss']
})
export class CreateHeroComponent implements OnInit, OnDestroy {
    @Input({'required': true})
    public mode: string = '';

    @Input()
    public hero!: IHero;

    public form: FormGroup = this._formBuilderService.heroForm;

    public abilities$: Observable<IItem[]> = this._manageAbilitiesService.abilities$;
    public submitButtonText: string = '';
    public errorMessage: string = '';
    public buttonType: string = '';
    public filterFormValue!: IFilterForm;
    public readonly EDialogMode = EDialogMode;

    private filterFormSubscription!: Subscription;

    constructor(
        private readonly _manageHeroesService: ManageHeroesService,
        private readonly _manageAbilitiesService: ManageAbilitiesService,
        private readonly _formBuilderService: FormBuilderService,
        private readonly  _spaceControlService: spaceControlService,
        private readonly _filterFormService: FilterFormService,
    ) {
    }

    public ngOnInit(): void {
        this.filterFormSubscription = this._filterFormService.form$
            .subscribe((filterFormValue: IFilterForm): void => {
                this.filterFormValue = filterFormValue;
        })
        if (this.mode === EDialogMode.CREATE) {
            this.submitButtonText = 'Создать героя';
            this.buttonType = 'default';
        } else if (this.mode === EDialogMode.EDIT) {
            this.submitButtonText = 'Сохранить изменения';
            this.buttonType = 'success';
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
            this._manageHeroesService.add(hero, this.filterFormValue);
            this.form.reset();
        } else if (this.mode === EDialogMode.EDIT) {
           // this.hero[LHero.IS_SELECTED] = true; // не нужно
            this._manageHeroesService.edit(hero);
        }
    }

    /**
     * Функция, отслеживающая пробелы в инпуте
     * @param {FormControl} nameControl
     */
    public firstSpace(nameControl: FormControl): void {
        this. _spaceControlService.spaceControl(nameControl);
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

    /**
     * Возвращает валидность формы
     *
     * return {boolean}
     */
    public get formGroupInvalid(): boolean {
        return this.form.invalid;
    }

    public ngOnDestroy(): void {
        this.filterFormSubscription.unsubscribe();
    }
}
