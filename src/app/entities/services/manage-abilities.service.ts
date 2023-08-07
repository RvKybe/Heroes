import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IItem} from "../interfaces/item.interface";
import {LItem} from "../labels/item.label";

@Injectable({
    providedIn: 'root'
})
export class ManageAbilitiesService {
    private _abilities: IItem[] = [
        {
            id: 1,
            name: 'Суперсила'
        },
        {
            id: 2,
            name: 'Суперскорость'
        },
        {
            id: 3,
            name: 'Телепортация'
        },
        {
            id: 4,
            name: 'Деньги'
        },
    ];
    private _abilities$$: BehaviorSubject<IItem[]> = new BehaviorSubject(this._abilities);
    public abilities$: Observable<IItem[]> = this._abilities$$.asObservable();

    /**
     * Функция создания способности
     *
     * @param {string} abilityName - название созданной способности
     */
    public add(abilityName: string): void {
        const lastAbility: IItem = <IItem>this._abilities.at(-1);
        let lastAbilityId: number = lastAbility[LItem.ID];
        const newAbility: IItem = {
            [LItem.ID]: ++lastAbilityId,
            [LItem.NAME]: abilityName,
        };
        this._abilities.push(newAbility);
        this._abilities$$.next(this._abilities);
    }

    /**
     * Функция проверки способности на наличие дубликата
     *
     * @param {string} abilityName - название новой способности
     * @return {boolean}
     */
    public hasDuplicate(abilityName: string): boolean {
        return this._abilities.some((ability: IItem) => ability[LItem.NAME] === abilityName);
    }
}
