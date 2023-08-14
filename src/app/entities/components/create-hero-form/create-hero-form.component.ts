import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
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
import {FilterFormService} from "../../services/filter-form.service";
import {IFilterForm} from "../../interfaces/filter-form.interface";
import {trimSpace} from "../../utils/trim-space.util";

@Component({
    selector: 'app-create-hero-form',
    templateUrl: './create-hero-form.component.html',
    styleUrls: ['./create-hero-form.component.scss']
})
export class CreateHeroFormComponent implements OnInit, OnDestroy {
    @HostBinding('class')
    public hostClass: string = '';

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

    private filterFormSubscription!: Subscription;

    protected readonly EDialogMode: typeof EDialogMode = EDialogMode;

    constructor(
        private readonly _manageHeroesService: ManageHeroesService,
        private readonly _manageAbilitiesService: ManageAbilitiesService,
        private readonly _formBuilderService: FormBuilderService,
        private readonly _filterFormService: FilterFormService,
    ) {}

    public ngOnInit(): void {
        this.switchFormClass();
        this.filterFormSubscription = this._filterFormService.form$
            .subscribe((filterFormValue: IFilterForm) => {
                this.filterFormValue = filterFormValue;
            });
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
     * Функция, которая даёт класс родителю в зависимости от режима вызовы компонента
     */
    public switchFormClass(): void {
        if (this.mode === EDialogMode.CREATE) {
            this.hostClass = 'create-mode';
        } else {
            this.hostClass = 'edit-mode';
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
            this._manageHeroesService.edit(hero, this.filterFormValue);
        }
    }

    /**
     * Передаёт контроллер формы в сервис по обработке пробелов
     * @param {FormControl} nameControl - контроллер формы (поле ввода имени)
     */
    public trimSpace(nameControl: FormControl): void { // onChange
        trimSpace(nameControl);
    }

    /**
     * Возвращает контроллер name формы
     * @return {FormControl<string | null>}
     */
    public get nameFormControl(): FormControl<string | null> {
        return this.form.get(LItem.NAME) as FormControl<string | null>;
    }

    /**
     * Возвращает контроллер power формы
     * @return {FormControl<string | null>}
     */
    public get powerFormControl(): FormControl<number | null> {
        return this.form.get(LHero.POWER) as FormControl<number | null>;
    }

    /**
     * Возвращает контроллер abilities формы
     * @return {FormControl<string | null>}
     */
    public get abilityFormControl(): FormControl<number[] | null> {
        return this.form.get(LHero.ABILITY_IDS) as FormControl<number[] | null>;
    }

    /**
     * Возвращает контроллер level формы
     * @return {FormControl<string | null>}
     */
    public get levelFormControl(): FormControl<number | null> {
        return this.form.get(LHero.LEVEL) as FormControl<number | null>;
    }

    public ngOnDestroy(): void {
        this.filterFormSubscription.unsubscribe();
    }
}
