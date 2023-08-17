import {Component, DestroyRef, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup,} from "@angular/forms";
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {IHero} from "../../interfaces/hero.interface";
import {Observable} from "rxjs";
import {LHero} from "../../labels/hero.label";
import {FormBuilderService} from "../../services/form-builder.service";
import {EHeroFormMode} from "../../enums/hero-form-mode.enum";
import {LItem} from "../../labels/item.label";
import {IItem} from "../../interfaces/item.interface";
import {EErrorMessage} from "../../enums/error-message.enum";
import {FilterFormService} from "../../services/filter-form.service";
import {IFilterForm} from "../../interfaces/filter-form.interface";
import {trimSpace} from "../../utils/trim-space.util";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-hero-form',
    templateUrl: './hero-form.component.html',
    styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {
    @HostBinding('class')
    public hostClass: string = '';

    @Input({'required': true})
    public formMode!: EHeroFormMode;

    @Input()
    public hero!: IHero;

    @Output()
    public closePopupEvent: EventEmitter<boolean> = new EventEmitter();

    public form: FormGroup = this._formBuilderService.heroForm;

    public abilities$: Observable<IItem[]> = this._manageAbilitiesService.abilities$;
    public errorMessage: string = '';
    public filterFormValue!: IFilterForm;

    protected readonly EDialogMode: typeof EHeroFormMode = EHeroFormMode;
    protected readonly LItem = LItem;
    protected readonly EHeroFormMode = EHeroFormMode;


    constructor(
        private readonly _manageHeroesService: ManageHeroesService,
        private readonly _manageAbilitiesService: ManageAbilitiesService,
        private readonly _formBuilderService: FormBuilderService,
        private readonly _filterFormService: FilterFormService,
        private readonly _destroyRef: DestroyRef
    ) {}

    public ngOnInit(): void {
        this.switchFormClass();
        this._filterFormService.form$.pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((filterFormValue: IFilterForm) => {
            this.filterFormValue = filterFormValue;
        });
        this.nameFormControl.valueChanges.pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                trimSpace(this.nameFormControl);
            })
        if (this.formMode === EHeroFormMode.CREATE) {
            this._manageAbilitiesService.getAllAbilities();
        } else {
            this.form.patchValue(<IHero>this.hero);
        }
    }

    /**
     * Присваивает класс родителю в зависимости от режима работы компонента
     */
    public switchFormClass(): void {
        this.hostClass = this.formMode === EHeroFormMode.CREATE ? 'create-mode' : 'edit-mode';
    }

    /**
     * Отправляет форму
     */
    public submit(): void {
        const hero: IHero = <IHero>this.form.value;
        this.errorMessage = '';
        const heroId: number | null = this.hero ? <number>this.hero[LItem.ID] : null;
        const hasDuplicate: boolean = this._manageHeroesService.heroHasDuplicate(hero[LItem.NAME], heroId);
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        if (hasDuplicate) {
            this.errorMessage = EErrorMessage.HERO_EXIST;
            return;
        }
        if (this.formMode === EHeroFormMode.CREATE) {
            this._manageHeroesService.addHero(hero, this.filterFormValue);
            this.form.reset();
        } else {
            this._manageHeroesService.editHero(hero, this.filterFormValue);
            this.closePopupEvent.emit(false);
        }
    }

    public get nameFormControl(): FormControl<string | null> {
        return this.form.get(LItem.NAME) as FormControl<string | null>;
    }

    public get powerFormControl(): FormControl<number | null> {
        return this.form.get(LHero.POWER) as FormControl<number | null>;
    }

    public get abilityIdsFormControl(): FormControl<number[] | null> {
        return this.form.get(LHero.ABILITY_IDS) as FormControl<number[] | null>;
    }

    public get levelFormControl(): FormControl<number | null> {
        return this.form.get(LHero.LEVEL) as FormControl<number | null>;
    }
}
