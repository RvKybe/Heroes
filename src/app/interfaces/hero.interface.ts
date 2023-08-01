/**
 * Интерфейс героя
 */
export interface IHero {
    name: string;
    power: number;
    abilityIds: number[];
    level: number;
    id?: number;
}
