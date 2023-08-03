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
     * @param filterFormValue
     */
    public add(hero: IHero, filterFormValue: IFilterForm): void {
        hero[LHero.IS_SELECTED] = false;
        if (!this._heroes.length) {
            hero[LItem.ID] = 1;
        } else {
            const lastHero: IHero = <IHero>this._heroes.at(-1);
            hero[LItem.ID] = lastHero[LItem.ID] + 1;
        }
        this._heroes.push(hero);
        this.sortHeroes(filterFormValue)
    }

    /**
     * Функция редактирования героя
     *
     * @param {IHero} formHero - новый объект героя
     */
    public edit(formHero: IHero): void {
        const heroIndex: number = this._heroes.findIndex((hero: IHero): boolean => hero[LItem.ID] === formHero[LItem.ID]);
        if (heroIndex !== -1) {
            formHero[LHero.IS_SELECTED] = true;
            this._heroes[heroIndex] = formHero;
        }
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
    }
}
