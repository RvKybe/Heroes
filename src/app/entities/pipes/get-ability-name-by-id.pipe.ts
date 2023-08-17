import {Pipe, PipeTransform} from '@angular/core';
import {IItem} from "../interfaces/item.interface";
import {LItem} from "../labels/item.label";


@Pipe({
    name: 'getAbilityNameById'
})
export class GetAbilityNameByIdPipe implements PipeTransform {
    /**
     * Получение наименования способности по идентификатору
     *
     * @param {number} abilityId - id способности у героя
     * @param {IItem[] | null} abilities - способности
     * @return {string}
     */
    public transform(abilityId: number, abilities: IItem[] | null): string {
        if (!abilities) {
            return '';
        }
        const foundAbility: IItem | undefined = abilities.find((ability: IItem) => {
            return ability[LItem.ID] === abilityId;
        });
        return foundAbility ? foundAbility[LItem.NAME] : '';
    }
}
