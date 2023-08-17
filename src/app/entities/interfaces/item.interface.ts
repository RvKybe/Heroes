import {LItem} from "../labels/item.label";

/**
 * Базовый интерфейс предмета
 *
 * @param {number} ID - id предмета
 * @param {string} NAME - название предмета
 */
export interface IItem {
    [LItem.ID]: number;
    [LItem.NAME]: string;
}