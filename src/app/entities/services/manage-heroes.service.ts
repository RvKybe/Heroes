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
    private _heroes$$: BehaviorSubject<IHero[]> = new BehaviorSubject<IHero[]>([]);
    public heroes$: Observable<IHero[]> = this._heroes$$.asObservable();

    /**
     * Функция создания героя
     *
     * @param {IHero} hero - объект героя
     * @param {IFilterForm} filterFormValue - значение формы фильтрации
     */
    public add(hero: IHero, filterFormValue: IFilterForm): void {
        const heroes: IHero[] = this._heroes$$.getValue();
        if (!heroes.length) {
            hero[LItem.ID] = 1;
        } else {
            let lastHeroId: number = -1;
            heroes.forEach((hero: IHero) => {
                if (hero[LItem.ID] > lastHeroId) {
                    lastHeroId = hero[LItem.ID];
                }
            })
            hero[LItem.ID] = lastHeroId + 1;
        }
        heroes.push(hero);
        this.sortHeroes(filterFormValue, heroes);
    }

    /**
     * Функция редактирования героя
     *
     * @param {IHero} formHero - новый объект героя
     * @param {IFilterForm} filterFormValue - значение фильтрационной формы
     */
    public edit(formHero: IHero, filterFormValue: IFilterForm): void {
        const heroes: IHero[] = this._heroes$$.getValue();
        const heroIndex: number = heroes.findIndex((hero: IHero) => hero[LItem.ID] === formHero[LItem.ID]);
        if (heroIndex !== -1) {
            heroes[heroIndex] = formHero;
        }
        this.sortHeroes(filterFormValue, heroes);
    }

    /**
     * Функция проверки героя на существование его дубликата
     *
     * @param {string} newHeroName - новое имя (или измененное имя существующего героя)
     * @param {number} newHeroId - id нового героя (или измененного старого)
     * @return {boolean}
     */
    public hasDuplicate(newHeroName: string, newHeroId: number | null): boolean {
        const heroes: IHero[] = this._heroes$$.getValue();
        return !!heroes.length && heroes.some((hero: IHero) => {
            return hero[LItem.NAME] === newHeroName && newHeroId !== hero[LItem.ID];
        });
    }

    /**
     * Функция запуска фильтрации и сортировки героев
     *
     * @param {IFilterForm} filterFormValue - форма фильтрации и сортировки
     * @param {IHero[]} heroes - герои для сортировки и отправка
     */
    public sortHeroes(filterFormValue: IFilterForm, heroes: IHero[] | null): void {
        if (!heroes) {
            heroes = this._heroes$$.getValue();
        }
        heroes.sort((a: IHero, b: IHero) => {
            return (a[LHero.LEVEL] - b[LHero.LEVEL]) * filterFormValue[LFilterForm.SORT_MODE];
        });
        this._heroes$$.next(heroes);
    }

    /**
     * Пайп, который фильтрует героев
     *
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
     * @private // что первее?
     * @return {boolean}
     */
    private searchAbilityName(heroAbilities: number[],filterAbilities: number[]): boolean {
        filterAbilities = filterAbilities.concat(heroAbilities);
        const set: Set<number> = new Set(filterAbilities);
        return set.size < filterAbilities.length || set.size === 1;
    }
}
