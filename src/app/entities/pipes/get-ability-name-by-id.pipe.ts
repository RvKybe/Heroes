import {Pipe, PipeTransform} from '@angular/core';
import {IItem} from "../interfaces/item.interface";
import {LItem} from "../labels/item.label";


@Pipe({
    name: 'getAbilityNameById'
})
export class GetAbilityNameByIdPipe implements PipeTransform {
    /**
     * Пайп, который возвращает имя способности героя по id
     *
     * @param {number} abilityId - id способности у героя
     * @param {IItem[]} abilities - способности
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
