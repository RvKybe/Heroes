import {LFilterForm} from "../labels/filter-form.label";

/**
 * Интерфейс формы фильтрации
 *
 * @param {number} BOTTOM_LEVEL - нижний пороговый уровень героя для фильтрации
 * @param {number} TOP_LEVEL - верхний пороговый уровень героя для фильтрации
 * @param {number[]} ABILITY_IDS - список id способностей для фильтрации
 * @param {string} HERO_NAME - строка для фильтрации по имени героя
 * @param {number} SORT_MODE - число, обозначающее режим работы сортировки
 */
export interface IFilterForm {
    [LFilterForm.BOTTOM_LEVEL]: number;
    [LFilterForm.TOP_LEVEL]: number;
    [LFilterForm.ABILITY_IDS]: number[];
    [LFilterForm.HERO_NAME]: string;
    [LFilterForm.SORT_MODE]: number;
}
