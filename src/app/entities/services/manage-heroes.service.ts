import {Injectable} from '@angular/core';
import {IHero} from "../interfaces/hero.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {LFilterForm} from "../labels/filter-form.label";
import {LHero} from "../labels/hero.label";
import {IFilterForm} from "../interfaces/filter-form.interface";
import {LItem} from "../labels/item.label";

@Injectable({
    providedIn: 'root'
})
export class ManageHeroesService {
    private _heroes: IHero[] = [];
    private _heroes$$: BehaviorSubject<IHero[]> = new BehaviorSubject(this._heroes);
    public heroesStream$: Observable<IHero[]> = this._heroes$$.asObservable();

    /**
     * Функция создания героя
     *
     * @param {IHero} hero - объект героя
     * @param {IFilterForm} filterFormValue - значение формы фильтрации
     */
    public add(hero: IHero, filterFormValue: IFilterForm): void {
        hero[LHero.IS_VISIBLE] = false;
        if (!this._heroes.length) {
            hero[LItem.ID] = 1;
        } else {
            const lastHero: IHero = <IHero>this._heroes.at(-1);
            hero[LItem.ID] = lastHero[LItem.ID] + 1;
        }
        this._heroes.push(hero);
        this.sortHeroes(filterFormValue);
    }

    /**
     * Функция редактирования героя
     *
     * @param {IHero} formHero - новый объект героя
     * @param filterFormValue
     */
    public edit(formHero: IHero, filterFormValue: IFilterForm): void {
        const heroIndex: number = this._heroes.findIndex((hero: IHero): boolean => hero[LItem.ID] === formHero[LItem.ID]);
        if (heroIndex !== -1) {
            this._heroes[heroIndex] = formHero;
        }
        this.sortHeroes(filterFormValue);
    }

    /**
     * Функция проверки героя на существование его дубликата
     *
     * @param {string} newHeroName - новое имя (или измененное имя существующего героя)
     * @param {number | null} newHeroId - id нового героя (или измененного старого)
     * return {boolean}
     */
    public hasDuplicate(newHeroName: string, newHeroId: number | null): boolean {
        return !!this._heroes.length && this._heroes.some((hero: IHero) => {
            return hero[LItem.NAME] === newHeroName && newHeroId !== hero[LItem.ID];
        });
    }

    /**
     * Функция запуска фильтрации и сортировки героев
     *
     * @param {IFilterForm} filterFormValue - форма фильтрации и сортировки
     */
    public sortHeroes(filterFormValue: IFilterForm): void {
        this._heroes.sort((a: IHero, b: IHero): number => {
            return (a[LHero.LEVEL] - b[LHero.LEVEL]) * filterFormValue[LFilterForm.SORT_MODE];
        });
        this._heroes$$.next(this._heroes);
    }

    /**
     * Пайп, который фильтрует героев
     *
     * @param {IHero[]} heroes - список героев для фильтрации
     * @param {IFilterForm} filterFormValue - значения полей формы фильтрации
     * return {IHero[]}
     */
    public filterHeroes(heroes: IHero[], filterFormValue: IFilterForm): IHero[] {
        return heroes.filter((hero: IHero): boolean => {
            return ((!filterFormValue[LFilterForm.BOTTOM_LEVEL] && !filterFormValue[LFilterForm.TOP_LEVEL])
                    || (hero[LHero.LEVEL] <= filterFormValue[LFilterForm.TOP_LEVEL] && !filterFormValue[LFilterForm.BOTTOM_LEVEL])
                    || (hero[LHero.LEVEL] >= filterFormValue[LFilterForm.BOTTOM_LEVEL] && !filterFormValue[LFilterForm.TOP_LEVEL])
                    || (hero[LHero.LEVEL] <= filterFormValue[LFilterForm.TOP_LEVEL] && hero[LHero.LEVEL] >= filterFormValue[LFilterForm.BOTTOM_LEVEL]))
                && (!filterFormValue[LFilterForm.ABILITY_IDS].length || this.searchAbilityName(hero[LHero.ABILITY_IDS], filterFormValue[LFilterForm.ABILITY_IDS]))
                && (!filterFormValue[LFilterForm.HERO_NAME] || hero[LItem.NAME].indexOf(filterFormValue[LFilterForm.HERO_NAME]) > -1);
        })
    }

    /**
     * Функция фильтрации по способностям.
     *
     * Способности героя и фильтрационные способности образуют список уникальных значений
     * Если длина списка меньше суммы длин способностей героя и фильтрационных способностей
     * То это означает наличие совпадения в этих двух списках, что означает, что герой подходит
     * При длине уникального списка === 1, также происходит совпадение способностей
     *
     * @param {number[]} heroAbilities - список способностей героя
     * @param {number[]} filterAbilities - список фильтрационных способностей
     * return {boolean}
     * @private
     */
    private searchAbilityName(heroAbilities: number[],filterAbilities: number[]): boolean {
        filterAbilities = filterAbilities.concat(heroAbilities);
        const set: Set<number> = new Set(filterAbilities);
        return set.size < filterAbilities.length || set.size === 1;
    }
}
