import {Component, OnDestroy, OnInit} from '@angular/core';
import {ManageAbilitiesService} from "../../../services/manage-abilities.service";
import {ManageHeroesService} from "../../../services/manage-heroes.service";
import {FormControl, FormGroup} from "@angular/forms";
import {IAbility} from "../../../interfaces/ability.interface";
import {FormBuilderService} from "../../../services/form-builder.service";
import {EFilters} from "../../../enums/filterFrom.enum";
import {FilterFormService} from "../../../services/filter-form.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  public possibleAbilities!: IAbility[];
  public sort: string = 'fromLowLevel';
  public iconName: string = 'chevronup';
  public sortName: string = 'возрастанию';
  public abilitySubscription!: Subscription;
  public formChangeSubscription!: Subscription;

  form:FormGroup = this._formBuilderService.filterForm;

  constructor(
    private readonly _manageAbilitiesService: ManageAbilitiesService,
    private readonly _manageHeroesService: ManageHeroesService,
    private readonly _formBuilderService: FormBuilderService,
    private readonly _filterFormService: FilterFormService,
  ) {}

  public ngOnInit(): void {
    this.form.get([EFilters.SORT_MODE])?.patchValue(1);
    this._filterFormService.form = this.form;
    this.abilitySubscribe();
    this.formChangeSubscription = this.form.valueChanges
      .subscribe((): void => {
        this._manageHeroesService.sortHeroes(this.form.get(`${[EFilters.SORT_MODE]}`)?.value);
        this._manageHeroesService.filterHeroes(this.form);
      });
  }

  /**
   * Подписка на изменения в списке способностей
   */
  public abilitySubscribe(): void {
    this.abilitySubscription = this._manageAbilitiesService.abilityStream$
      .subscribe((abilities: IAbility[]) => this.possibleAbilities = abilities);
  }

  public ngOnDestroy(): void {
    this.abilitySubscription.unsubscribe();
    this.formChangeSubscription.unsubscribe();
  }

  /**
   * Переключение сортировки
   */
  public switchSort(): void {
    this.sort = this.sort === 'fromLowLevel' ? 'fromHighLevel' : 'fromLowLevel';
    switch(this.sort) {
      case 'fromLowLevel':
        this.iconName = 'chevronup';
        this.sortName = 'возрастанию';
        break;
      case 'fromHighLevel':
        this.iconName = 'chevrondown';
        this.sortName = 'убыванию';
        break;
    }
    const sortMode: number = this.sort === 'fromLowLevel' ? 1 : -1;
    this.form.get(`${[EFilters.SORT_MODE]}`)?.patchValue(sortMode);
  }

  public get bottomLevelFormControl(): FormControl<string | null> {
    return this.form.get([EFilters.BOTTOM_LEVEL]) as FormControl<string | null>;
  }
  public get topLevelFormControl(): FormControl<string | null> {
    return this.form.get([EFilters.TOP_LEVEL]) as FormControl<string | null>;
  }
  public get abilitiesFormControl(): FormControl<string | null> {
    return this.form.get([EFilters.ABILITIES]) as FormControl<string | null>;
  }
  public get heroNameFormControl(): FormControl<string | null> {
    return this.form.get([EFilters.HERO_NAME]) as FormControl<string | null>;
  }
  public get sortModeFormControl(): FormControl<string | null> {
    return this.form.get([EFilters.SORT_MODE]) as FormControl<string | null>;
  }
}
