import {Pipe, PipeTransform} from '@angular/core';
import {IItem} from "../interfaces/item.interface";
import {LItem} from "../labels/item.label";


@Pipe({
    name: 'getAbilityNameById'
})
export class GetAbilityNameByIdPipe implements PipeTransform {
    /**
     * Пайп, который возвращает имена способностей героя по id способностей
     *
     * @param {number} abilityId - id способности
     * @param {IItem[]} abilities - способности
     * @return {string}
     */
    public transform(abilityId: number, abilities: IItem[] | null): any {
        if (!!abilities) {
            const foundAbility: IItem = <IItem>abilities.find((ability: IItem) => {
                return ability[LItem.ID] === abilityId;
            });
            if (!!foundAbility) {
                return foundAbility[LItem.NAME];
            }
        } else {
            return '';
        }
    }
}
