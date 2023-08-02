import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IItem} from "../interfaces/item.interface";
import {LItem} from "../labels/item.label";

@Injectable({
  providedIn: 'root'
})
export class ManageAbilitiesService {
  private _possibleAbilities: IItem[] = [
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
  private _abilities$$: BehaviorSubject<IItem[]> = new BehaviorSubject(this._possibleAbilities);
  public abilities$: Observable<IItem[]> = this._abilities$$.asObservable();

  /**
   * Функция создания способности
   * @param {string} abilityName - название созданной способности
   */
  public add(abilityName: string): void {
    const lastAbility: IItem = <IItem>this._possibleAbilities.at(-1);
    let lastAbilityId: number = lastAbility[LItem.ID];
    const newAbility: IItem = {
        [LItem.ID]: ++lastAbilityId,
        [LItem.NAME]: abilityName,
    };
    this._possibleAbilities.push(newAbility);
    this._abilities$$.next(this._possibleAbilities);
  }

  /**
   * Функция проверки способности на наличие дубликата
   * @param {string} abilityName - название новой способности
   * return {boolean}
   */
  public hasDuplicate(abilityName: string): boolean {
    return this._possibleAbilities.some((ability: IItem): boolean => ability[LItem.NAME] === abilityName);
  }
}
