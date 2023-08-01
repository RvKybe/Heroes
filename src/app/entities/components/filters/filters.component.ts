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

  form:FormGroup = this._formBuilderService.filterForm;

  public possibleAbilities: IAbility[] = [];
  public sort: string = 'fromLowLevel';
  public iconName: string = 'chevronup';
  public outputSortName: string = 'возрастанию';
  public abilitySubscription!: Subscription;
  public formChangeSubscription!: Subscription;

  constructor(
    private readonly _manageAbilitiesService: ManageAbilitiesService,
    private readonly _manageHeroesService: ManageHeroesService,
    private readonly _formBuilderService: FormBuilderService,
    private readonly _filterFormService: FilterFormService,
  ) {}

  public ngOnInit(): void {
    this._filterFormService.form = this.form.value;
    this.initAbilitySubscription();
    this.initFilterFormChangeSubscription();

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
        this.outputSortName = 'возрастанию';
        break;
      case 'fromHighLevel':
        this.iconName = 'chevrondown';
        this.outputSortName = 'убыванию';
        break;
    }
    const sortMode: number = this.sort === 'fromLowLevel' ? 1 : -1;
    this.form.get([EFilters.SORT_MODE])?.setValue(sortMode);
  }

  /**
   * Создаёт подписку на поток способностей
   * @private
   */
  private initAbilitySubscription(): void {
    this.abilitySubscription = this._manageAbilitiesService.abilityStream$
        .subscribe((abilities: IAbility[]) => this.possibleAbilities = abilities);
  }

  /**
   * Создаёт подписку на изменения формы фильтрации
   * @private
   */
  private initFilterFormChangeSubscription(): void {
    this.formChangeSubscription = this.form.valueChanges.subscribe((): void => {
          this._manageHeroesService.sortFilterHeroes(this.form.value);
        });
  }

  /**
   * Возвращает контроллер bottomLevel формы
   * return {FormControl}
   */
  public get bottomLevelFormControl(): FormControl<string | null> {
    return this.form.get([EFilters.BOTTOM_LEVEL]) as FormControl<string | null>;
  }

  /**
   * Возвращает контроллер topLevel формы
   * return {FormControl}
   */
  public get topLevelFormControl(): FormControl<string | null> {
    return this.form.get([EFilters.TOP_LEVEL]) as FormControl<string | null>;
  }

  /**
   * Возвращает контроллер abilities формы
   * return {FormControl}
   */
  public get abilitiesFormControl(): FormControl<string | null> {
    return this.form.get([EFilters.ABILITIES]) as FormControl<string | null>;
  }

  /**
   * Возвращает контроллер heroName формы
   * return {FormControl}
   */
  public get heroNameFormControl(): FormControl<string | null> {
    return this.form.get([EFilters.HERO_NAME]) as FormControl<string | null>;
  }
}