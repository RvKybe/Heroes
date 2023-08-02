import {Pipe, PipeTransform} from '@angular/core';
import {IItem} from "../interfaces/item.interface";
import {LItem} from "../labels/item.label";


@Pipe({
    name: 'getAbilitiesNamesByIds'
})
export class GetAbilitiesNamesByIdsPipe implements PipeTransform {

    /**
     * Пайп, который возвращает имена способностей героя по id способностей
     *
     * @param {number} heroAbility - id способности
     * @param {IItem[] | null} possibleAbilities - все возможные способности героев
     * return {string}
     */
    public transform(heroAbility: number, possibleAbilities: IItem[] | null): string {
        const a: IItem = <IItem>possibleAbilities?.find((ability: IItem): boolean => {
            return ability[LItem.ID] === heroAbility;
        });
        return a[LItem.NAME];
    }
}
