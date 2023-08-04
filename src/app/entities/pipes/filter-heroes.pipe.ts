import {Pipe, PipeTransform} from '@angular/core';
import {IFilterForm} from "../interfaces/filter-form.interface";
import {IHero} from "../interfaces/hero.interface";
import {LFilterForm} from "../labels/filter-form.label";
import {LHero} from "../labels/hero.label";
import {LItem} from "../labels/item.label";

@Pipe({
    name: 'filterHeroes',
    pure: false
})
export class FilterHeroesPipe implements PipeTransform {
    /**
     * Пайп, который фильтрует героев
     *
     * @param {IHero[]} heroes - список героев для фильтрации
     * @param {IFilterForm} filterFormValue - значения полей формы фильтрации
     * return {IHero[]}
     */
    public transform(heroes: IHero[] | null, filterFormValue: IFilterForm | null): IHero[] {
        if (!heroes || !filterFormValue) {
            return [];
        }
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