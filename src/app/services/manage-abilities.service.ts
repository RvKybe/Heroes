import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IAbility} from "../interfaces/ability.interface";
import {EAbility} from "../enums/ability.enum";

@Injectable({
  providedIn: 'root'
})
export class ManageAbilitiesService {
  private _possibleAbilities: IAbility[] = [
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
  private _abilityStream$: BehaviorSubject<IAbility[]> = new BehaviorSubject(this._possibleAbilities);
  public abilityStream$: Observable<IAbility[]> = this._abilityStream$.asObservable();

  /**
   * Функция создания способности
   * @param abilityName - название созданной способности
   */
  public add(abilityName: string): void {
    const obj: IAbility = <IAbility>this._possibleAbilities.at(-1);
    let lid: number = obj.id;
    const newAbility: IAbility = {
        id: ++lid,
        name: abilityName,
    };
    this._possibleAbilities.push(newAbility);
    this._abilityStream$.next(this._possibleAbilities);
  }

  /**
   * Функция проверки способности на наличие дубликата
   * @param abilityName - название новой способности
   * return {boolean}
   */
  public hasDuplicate(abilityName: string): boolean {
    return this._possibleAbilities.some((ability: IAbility): boolean => ability[EAbility.NAME] === abilityName);
  }
}
