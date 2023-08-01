import {EAbility} from "../enums/ability.enum";

/**
 * Интерфейс способности
 */
export interface IAbility {
    [EAbility.ID]: number;
    [EAbility.NAME]: string;
}
