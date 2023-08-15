import {Injectable} from '@angular/core';
import {IHero} from "../interfaces/hero.interface";
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
import {LFilterForm} from "../labels/filter-form.label";
import {LHero} from "../labels/hero.label";
import {IFilterForm} from "../interfaces/filter-form.interface";
import {LItem} from "../labels/item.label";
import {LRequest} from "../labels/request.label";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ManageHeroesService {
    private _heroes$$: BehaviorSubject<IHero[]> = new BehaviorSubject<IHero[]>([]);
    public heroes$: Observable<IHero[]> = this._heroes$$.asObservable();

    constructor (private readonly _http: HttpClient) {
    }

    public getHeroes(): void {
        lastValueFrom(this._http.get(LRequest.GET_HEROES)).then((res: any) => {
            this._heroes$$.next(res);
        });
    }

    /**
     * todo
     */
    public postHero(hero: IHero): void{
        fetch(LRequest.POST_HERO, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hero)
        }).then();
    }

    /**
     * todo
     */
    public putHero(hero: IHero): void{
        fetch(LRequest.PUT_HERO+`${hero[LItem.ID]}`, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hero)
        }).then();
    }
    /**
     * Функция создания героя
     *
     * @param {IHero} hero - объект героя
     * @param {IFilterForm} filterFormValue - значение формы фильтрации
     */
    public add(hero: IHero, filterFormValue: IFilterForm): void {
        this.postHero(hero);
        this.getHeroes();
        this.sortHeroes(filterFormValue);
    }

    /**
     * Функция редактирования героя
     *
     * @param {IHero} formHero - новый объект героя
     * @param {IFilterForm} filterFormValue - значение фильтрационной формы
     */
    public edit(formHero: IHero, filterFormValue: IFilterForm): void {
        this.putHero(formHero);
        this.getHeroes();
        this.sortHeroes(filterFormValue);
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
     */
    public sortHeroes(filterFormValue: IFilterForm): void {
        const heroes: IHero[] = this._heroes$$.getValue();
        heroes.sort((a: IHero, b: IHero) => {
            return (a[LHero.LEVEL] - b[LHero.LEVEL]) * filterFormValue[LFilterForm.SORT_MODE];
        });
        this._heroes$$.next(heroes);
    }

    /**
     * Фильтрация героев
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
     * Фильтрация по способностям
     *
     * Способности героя и фильтрационные способности образуют список уникальных значений
     * Если длина списка меньше суммы длин способностей героя и фильтрационных способностей
     * То это означает наличие совпадения в этих двух списках, что означает, что герой подходит
     * При длине уникального списка === 1, также происходит совпадение способностей
     *
     * @param {number[]} heroAbilities - список способностей героя
     * @param {number[]} filterAbilities - список фильтрационных способностей
     * @return {boolean}
     * @private
     */
    private searchAbilityName(heroAbilities: number[],filterAbilities: number[]): boolean {
        filterAbilities = filterAbilities.concat(heroAbilities);
        const set: Set<number> = new Set(filterAbilities);
        return set.size < filterAbilities.length || set.size === 1;
    }
}
