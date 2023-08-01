import {EHero} from "../enums/hero.enum";

/**
 * Интерфейс героя
 */
export interface IHero {
    [EHero.NAME]: string;
    [EHero.POWER]: number;
    [EHero.ABILITY_IDS]: number[];
    [EHero.LEVEL]: number;
    [EHero.ID]?: number;
}
