import {Injectable} from '@angular/core';
import {IHero} from "../interfaces/hero.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {EFilters} from "../enums/filter-form.enum";
import {FilterFormService} from "./filter-form.service";
import {EHero} from "../enums/hero.enum";
import {IFilterFormValue} from "../interfaces/filter-form.interface";

@Injectable({
  providedIn: 'root'
})
export class ManageHeroesService{
  private _filterFormValue!: IFilterFormValue;

  private _heroes:IHero[] = [];
  private _filteredHeroes: IHero[] = [];
  private _counter: number = 1;
  private _heroesStream$: BehaviorSubject<IHero[]> = new BehaviorSubject(this._heroes);
  public heroesStream$: Observable<IHero[]> = this._heroesStream$.asObservable();


  constructor(
      private readonly _filterFormService: FilterFormService
  ) {
      this._filterFormService.filterFormStream$.subscribe((filterFormValue: IFilterFormValue): void => {
        this._filterFormValue = filterFormValue;
      });
    }

  /**
   * Функция создания героя
   * @param {IHero} hero - объект героя
   */
  public add(hero:IHero): void {
    hero.id = this._counter++;
    this._heroes.push(hero);
    this.sortFilterHeroes(this._filterFormValue);
  }

  /**
   * Функция редактирования героя
   * @param {IHero} formHero - новый объект героя
   */
  public edit(formHero:IHero): void {
    const heroIndex: number = this._heroes.findIndex((hero: IHero): boolean => {
        return hero.id === formHero.id;
    });
    if (heroIndex !== -1) {
      this._heroes[heroIndex] = formHero;
      this.sortFilterHeroes(this._filterFormValue);
    }
  }

  /**
   * Функция проверки героя на существование его дубликата
   * @param {string} newHeroName - новое имя (или измененное имя существующего героя)
   * @param {number | null} newHeroId - id нового героя (или измененного старого)
   * return {boolean}
   */
  public hasDuplicate(newHeroName: string, newHeroId: number | null): boolean {
    if (this._heroes.length === 0) return false;
    return this._heroes.some((hero: IHero) => {
      return hero[EHero.NAME] === newHeroName && newHeroId !== hero[EHero.ID];
    });
  }

  /**
   * Функция запуска фильтрации и сортировки героев
   * @param {IFilterFormValue} filterFormValue - форма фильтрации и сортировки
   */
  public sortFilterHeroes(filterFormValue: IFilterFormValue): void {
    this._filterHeroes(filterFormValue);
    this._sortFilteredHeroes(filterFormValue[EFilters.SORT_MODE]);
    this._heroesStream$.next(this._filteredHeroes);
  }
  
  /**
   * Функция фильтрации героев
   * @param {IFilterFormValue} filterFormValue - параметры фильтрации
   */
  private _filterHeroes(filterFormValue: IFilterFormValue ): void {
    this._filteredHeroes = this._heroes.filter((hero: IHero) => {
      return ((!filterFormValue[EFilters.BOTTOM_LEVEL] && !filterFormValue[EFilters.TOP_LEVEL]) || (hero.level <= filterFormValue[EFilters.TOP_LEVEL] && !filterFormValue[EFilters.BOTTOM_LEVEL])
              || (hero.level >= filterFormValue[EFilters.BOTTOM_LEVEL] && !filterFormValue[EFilters.TOP_LEVEL]) || (hero.level <= filterFormValue[EFilters.TOP_LEVEL] && hero.level >= filterFormValue[EFilters.BOTTOM_LEVEL]))
          && (!filterFormValue[EFilters.ABILITIES] || this._searchAbilityName(filterFormValue[EFilters.ABILITIES], hero.abilityIds))
          && (!filterFormValue[EFilters.HERO_NAME] || hero.name.indexOf(filterFormValue[EFilters.HERO_NAME]) > -1);
    });
  }

  /**
   * Функция сортировки отфильтрованного списка героев
   * @param {number} sortMode - режим сортировки
   */
  private _sortFilteredHeroes(sortMode: number): void {
    this._filteredHeroes = this._filteredHeroes.sort((a: IHero, b: IHero) => {
      return (a[EHero.LEVEL] - b[EHero.LEVEL]) * sortMode;
    });
  }

  /**
   * Функция фильтрации по способностям.
   * Способности героя и фильтрационные способности образуют список уникальных значений
   * Если длина списка меньше суммы длин способностей героя и фильтрационных способностей
   * То это означает наличие совпадения в этих двух списках, что означает, что герой подходит
   * При длине уникального списка === 1, также происходит совпадение способностей
   * @param {number[]} filterAbilities - список фильтрационных способностей
   * @param {number[]} heroAbilities - список способностей героя
   * return {boolean}
   * @private
   */
  private _searchAbilityName(filterAbilities: number[], heroAbilities: number[]): boolean {
    const set: Set<number> = new Set(filterAbilities.concat(heroAbilities).values());
    return set.size < filterAbilities.length || set.size === 1;
  }
}
