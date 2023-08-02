import {Pipe, PipeTransform} from '@angular/core';
import {IFilterForm} from "../interfaces/filter-form.interface";
import {IHero} from "../interfaces/hero.interface";
import {LFilterForm} from "../labels/filter-form.label";

@Pipe({
    name: 'filterHeroes',
    pure: false
})
export class FilterHeroesPipe implements PipeTransform {
    /**
     *  Пайп, который фильтрует героев
     *
     *  @param {IHero[]} heroes - список героев для фильтрации
     * @param {IFilterForm} filterFormValue - значения полей формы фильтрации
     * return {IHero[]}
     */
    public transform(heroes: IHero[] | null, filterFormValue: IFilterForm | null): IHero[] {
        if (!heroes || !filterFormValue) {
            return [];
        }
        return heroes.filter((hero: IHero): boolean => {
            return ((!filterFormValue[LFilterForm.BOTTOM_LEVEL] && !filterFormValue[LFilterForm.TOP_LEVEL])
                    || (hero.level <= filterFormValue[LFilterForm.TOP_LEVEL] && !filterFormValue[LFilterForm.BOTTOM_LEVEL])
                    || (hero.level >= filterFormValue[LFilterForm.BOTTOM_LEVEL] && !filterFormValue[LFilterForm.TOP_LEVEL])
                    || (hero.level <= filterFormValue[LFilterForm.TOP_LEVEL] && hero.level >= filterFormValue[LFilterForm.BOTTOM_LEVEL]))
                && (!filterFormValue[LFilterForm.ABILITY_IDS] || this.searchAbilityName(filterFormValue[LFilterForm.ABILITY_IDS], hero.abilityIds))
                && (!filterFormValue[LFilterForm.HERO_NAME] || hero.name.indexOf(filterFormValue[LFilterForm.HERO_NAME]) > -1);
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
     * @param {number[]} filterAbilities - список фильтрационных способностей
     * @param {number[]} heroAbilities - список способностей героя
     * return {boolean}
     * @private
     */
    private searchAbilityName(filterAbilities: number[], heroAbilities: number[]): boolean {
        const set: Set<number> = new Set(filterAbilities.concat(heroAbilities).values());
        return set.size < filterAbilities.length || set.size === 1;
    }
}