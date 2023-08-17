import {Injectable} from '@angular/core';
import {IHero} from "../interfaces/hero.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {LFilterForm} from "../labels/filter-form.label";
import {LHero} from "../labels/hero.label";
import {IFilterForm} from "../interfaces/filter-form.interface";
import {LItem} from "../labels/item.label";
import {LRequest} from "../labels/request.label";
import {HttpClient} from "@angular/common/http";
import {PreloaderService} from "./preloader.service";

@Injectable({
    providedIn: 'root'
})
export class ManageHeroesService {
    private _heroes$$: BehaviorSubject<IHero[]> = new BehaviorSubject<IHero[]>([]);
    public heroes$: Observable<IHero[]> = this._heroes$$.asObservable();

    constructor (
        private readonly _httpClient: HttpClient,
        private readonly _preloaderService: PreloaderService
    ) {
    }

    /**
     * Создание героя
     * @param {IHero} hero - объект героя
     * @param {IFilterForm} filterFormValue - значение формы фильтрации
     */
    public addHero(hero: IHero, filterFormValue: IFilterForm): void {
        this._httpClient.post(LRequest.POST_HERO, hero).subscribe(() => {
            this._getHeroes(filterFormValue);
        })
    }

    /**
     * Редактирования героя
     * @param {IHero} formHero - новый объект героя
     * @param {IFilterForm} filterFormValue - значение фильтрационной формы
     */
    public editHero(formHero: IHero, filterFormValue: IFilterForm): void {
        this._httpClient.put(`${LRequest.PUT_HERO + formHero[LItem.ID]}`, formHero).subscribe(() => {
            this._getHeroes(filterFormValue);
        })
    }

    /**
     * Проверка героя на существование его дубликата
     * @param {string} newHeroName - новое имя (или измененное имя существующего героя)
     * @param {number | null} newHeroId - id нового героя (или измененного старого)
     * @return {boolean}
     */
    public heroHasDuplicate(newHeroName: string, newHeroId: number | null): boolean {
        const heroes: IHero[] = this._heroes$$.getValue();
        const hasDuplicate: boolean = heroes.some((hero: IHero) => {
            return hero[LItem.NAME] === newHeroName && newHeroId !== hero[LItem.ID];
        });
        return !!heroes.length && hasDuplicate;
    }

    /**
     * Запуск фильтрации и сортировки героев
     * @param {IFilterForm} filterFormValue - форма фильтрации и сортировки
     * @param {IHero[]} heroesFromBack - герои, полученные с бэка (необязательный параметр)
     */
    public sortHeroes(filterFormValue: IFilterForm, heroesFromBack?: IHero[]): void {
        const heroes: IHero[] = heroesFromBack ?? this._heroes$$.getValue();
        heroes.sort((hero1: IHero, hero2: IHero) => {
            return (hero1[LHero.LEVEL] - hero2[LHero.LEVEL]) * filterFormValue[LFilterForm.SORT_MODE];
        });
        this._heroes$$.next(heroes);
    }

    /**
     * Фильтрация героев
     * @param {IHero[]} heroes - список героев для фильтрации
     * @param {IFilterForm} filterFormValue - значения полей формы фильтрации
     * @return {IHero[]}
     */
    public filterHeroes(heroes: IHero[], filterFormValue: IFilterForm): IHero[] {
        return heroes.filter((hero: IHero) => {
            return ((!filterFormValue[LFilterForm.BOTTOM_LEVEL] && !filterFormValue[LFilterForm.TOP_LEVEL])
                    || (hero[LHero.LEVEL] <= filterFormValue[LFilterForm.TOP_LEVEL] && !filterFormValue[LFilterForm.BOTTOM_LEVEL])
                    || (hero[LHero.LEVEL] >= filterFormValue[LFilterForm.BOTTOM_LEVEL] && !filterFormValue[LFilterForm.TOP_LEVEL])
                    || (hero[LHero.LEVEL] <= filterFormValue[LFilterForm.TOP_LEVEL] && hero[LHero.LEVEL] >= filterFormValue[LFilterForm.BOTTOM_LEVEL]))
                && (!filterFormValue[LFilterForm.ABILITY_IDS].length || this.searchAbilityName(hero[LHero.ABILITY_IDS], filterFormValue[LFilterForm.ABILITY_IDS]))
                && (!filterFormValue[LFilterForm.HERO_NAME] || hero[LItem.NAME].indexOf(filterFormValue[LFilterForm.HERO_NAME]) > -1);
        });
    }

    /**
     * Фильтрация по способностям
     * Способности героя и способности в форме фильрации вместе образуют список уникальных значений
     * Если длина списка меньше суммы длин способностей героя и способностей формы
     * То существуют совпадения в этих двух списках, что означает, что герой подходит по парметру
     *
     * При длине уникального списка === 1, также происходит совпадение способностей
     * @param {number[]} heroAbilities - список способностей героя
     * @param {number[]} filterAbilities - список фильтрационных способностей
     * @return {boolean}
     * @private
     */
    private searchAbilityName(heroAbilities: number[], filterAbilities: number[]): boolean {
        filterAbilities = filterAbilities.concat(heroAbilities);
        const set: Set<number> = new Set(filterAbilities);
        return set.size < filterAbilities.length || set.size === 1;
    }

    /**
     * GET - запрос для героев
     * @param {IFilterForm} filterFormValue - значение формы фильтрации
     * @private
     */
    private _getHeroes(filterFormValue: IFilterForm): void {
        this._preloaderService.isVisible = true;
        this._httpClient.get<IHero[]>(LRequest.GET_HEROES).subscribe((heroesFromBack: IHero[]) => {
            this.sortHeroes(filterFormValue, heroesFromBack);
            this._preloaderService.isVisible = false;
        });
    }
}
