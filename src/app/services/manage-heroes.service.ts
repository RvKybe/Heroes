import {Injectable} from '@angular/core';
import {IHero} from "../interfaces/hero.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {EFilters} from "../enums/filterFrom.enum";
import {FilterFormService} from "./filter-form.service";
import {FormGroup} from "@angular/forms";
import {EHero} from "../enums/hero.enum";

@Injectable({
  providedIn: 'root'
})
export class ManageHeroesService{

  private heroes:IHero[] = [];
  private filteredHeroes: IHero[] = [];
  private counter: number = 1;
  private filterForm!: FormGroup;

  constructor(
      private readonly _filterFormService: FilterFormService
  ) {
      this._filterFormService.filterFormStream$.subscribe((form: FormGroup): void => {
        this.filterForm = form;
      });
    }

  /**
   * Функция создания героя
   * @param {IHero} hero - объект героя
   */
  public add(hero:IHero): void {
    hero.id = this.counter++;
    this.heroes.push(hero);
    this.sortHeroes(this.filterForm.get([EFilters.SORT_MODE])?.value);
    this.filterHeroes(this.filterForm)
  }

  /**
   * Функция редактирования героя
   * @param formHero - новый объект героя
   */
  public edit(formHero:IHero): void {
    const heroIndex: number = this.heroes.findIndex(hero => {
        return hero.id === formHero.id;
    });
    if (heroIndex !== -1) {
      this.heroes[heroIndex] = formHero;
      this.sortHeroes(this.filterForm.get(`${[EFilters.SORT_MODE]}`)?.value);
      this.filterHeroes(this.filterForm);
    }
  }

  /**
   * Функция фильтрации героев
   * @param form - параметры фильтрации
   */
  public filterHeroes(form: any ): void {
    this.filteredHeroes = this.heroes.filter((hero: IHero) => {
      return ((!form.get(`${EFilters.BOTTOM_LEVEL}`).value && !form.get(`${EFilters.TOP_LEVEL}`).value) || (hero.level <= form.get(`${EFilters.TOP_LEVEL}`).value && !form.get(`${EFilters.BOTTOM_LEVEL}`).value)
              || (hero.level >= form.get(`${EFilters.BOTTOM_LEVEL}`).value && !form.get(`${EFilters.TOP_LEVEL}`).value) || (hero.level <= form.get(`${EFilters.TOP_LEVEL}`).value && hero.level >= form.get(`${EFilters.BOTTOM_LEVEL}`).value))
          && (!form.get(`${EFilters.ABILITIES}`).value || this._searchAbilityName(form.get(`${EFilters.ABILITIES}`).value, hero.abilityIds))
          && (!form.get(`${EFilters.HERO_NAME}`).value || hero.name.indexOf(form.get(`${EFilters.HERO_NAME}`).value) > -1);
    });
    this._heroesStream$.next(this.filteredHeroes);
  }

  /**
   * Функция сортировки отфильтрованного списка героев
   * @param sortMode - режим сортировки
   */
  public sortHeroes(sortMode: number): void {
    this.heroes = this.heroes.sort((a: IHero, b: IHero) => {
      return (a[EHero.LEVEL] - b[EHero.LEVEL]) * sortMode;
    });
    this._heroesStream$.next(this.heroes);
  }

  /**
   * Функция проверки героя на существование его дубликата
   * @param newHeroName - новое имя (или измененное имя существующего героя)
   * @param newHeroId - id нового героя (или измененного старого)
   */
  public hasDuplicate(newHeroName: string, newHeroId: number | null): boolean {
    if (this.heroes.length === 0) return false;
    return this.heroes.some((hero: IHero) => {
      return hero[EHero.NAME] === newHeroName && newHeroId !== hero[EHero.ID];
    });
  }

  /**
   * Функция фильтрации по способностям.
   * Способности героя и фильтрационные способности образуют список уникальных значений
   * Если длина списка меньше суммы длин способностей героя и фильтрационных способностей
   * То это означает наличие совпадения в этих двух списках, что означает, что герой подходит
   * При длине уникального списка === 1, также происходит совпадение способностей
   * @param filterAbilities - список фильтрационных способностей
   * @param heroAbilities - список способностей героя
   * @private
   */
  private _searchAbilityName(filterAbilities: number[], heroAbilities: number[]): boolean {
    const set: Set<number> = new Set(filterAbilities.concat(heroAbilities).values());
    return set.size < filterAbilities.length || set.size === 1;
  }

  private _heroesStream$: BehaviorSubject<IHero[]> = new BehaviorSubject(this.heroes);
  public heroesStream$: Observable<IHero[]> = this._heroesStream$.asObservable();
}
