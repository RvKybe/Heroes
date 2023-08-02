import {LHero} from "../labels/hero.label";
import {IItem} from "./item.interface";

/**
 * Интерфейс героя
 * @param {number} POWER - сила героя
 * @param {number[]} ABILITY_IDS - список id способностей героя
 * @param {number} LEVEL - уровень героя
 * @extends {IItem}
 */
export interface IHero extends IItem {
    [LHero.POWER]: number;
    [LHero.ABILITY_IDS]: number[];
    [LHero.LEVEL]: number;
}
