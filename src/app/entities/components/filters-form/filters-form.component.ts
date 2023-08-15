import {Component, OnInit} from '@angular/core';
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {FormControl, FormGroup} from "@angular/forms";
import {IItem} from "../../interfaces/item.interface";
import {FormBuilderService} from "../../services/form-builder.service";
import {LFilterForm} from "../../labels/filter-form.label";
import {FilterFormService} from "../../services/filter-form.service";
import {Observable, Subscription} from "rxjs";
import {IFilterForm} from "../../interfaces/filter-form.interface";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";

@Component({
    selector: 'app-filters-form',
    templateUrl: './filters-form.component.html',
    styleUrls: ['./filters-form.component.scss']
})
export class FiltersFormComponent implements OnInit {
    public form: FormGroup = this._formBuilderService.filterForm;

    public possibleAbilities$: Observable<IItem[]> = this._manageAbilitiesService.abilities$;
    public sort: string = 'fromLowLevel';
    public iconName: string = 'chevronup';
    public outputSortName: string = 'возрастанию';
    public formChangeSubscription!: Subscription;

    constructor(
        private readonly _manageHeroesService: ManageHeroesService,
        private readonly _formBuilderService: FormBuilderService,
        private readonly _filterFormService: FilterFormService,
        private readonly _manageAbilitiesService: ManageAbilitiesService
    ) {
    }

    public ngOnInit(): void {
        this._filterFormService.form = this.form.value;
        this._initFilterFormChangeSubscription();
    }

    /**
     * Переключение сортировки
     */
    public switchSort(): void {
        this.sort = this.sort === 'fromLowLevel' ? 'fromHighLevel' : 'fromLowLevel';
        switch (this.sort) {
            case 'fromLowLevel':
                this.iconName = 'chevronup';
                this.outputSortName = 'возрастанию';
                break;
            case 'fromHighLevel':
                this.iconName = 'chevrondown';
                this.outputSortName = 'убыванию';
                break;
        }
        const sortMode: number = this.sort === 'fromLowLevel' ? 1 : -1;
        this.form.get(LFilterForm.SORT_MODE)?.setValue(sortMode);
    }

    /**
     * Создаёт подписку на изменения формы фильтрации
     * @private
     */
    private _initFilterFormChangeSubscription(): void {
        this.formChangeSubscription = this.form.valueChanges.subscribe((value: IFilterForm) => {
            this._filterFormService.form = this.form.value;
            this._manageHeroesService.sortHeroes(value);
        });
    }

    public get bottomLevelFormControl(): FormControl<number | null> {
        return this.form.get(LFilterForm.BOTTOM_LEVEL) as FormControl<number | null>;
    }

    public get topLevelFormControl(): FormControl<number | null> {
        return this.form.get(LFilterForm.TOP_LEVEL) as FormControl<number | null>;
    }

    public get abilityIdsFormControl(): FormControl<number[] | null> {
        return this.form.get(LFilterForm.ABILITY_IDS) as FormControl<number[] | null>;
    }

    public get heroNameFormControl(): FormControl<string | null> {
        return this.form.get(LFilterForm.HERO_NAME) as FormControl<string | null>;
    }
}