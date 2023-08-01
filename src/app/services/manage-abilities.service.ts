import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IAbility} from "../interfaces/ability.interface";
import {EAbility} from "../enums/ability.enum";

@Injectable({
  providedIn: 'root'
})
export class ManageAbilitiesService {

  /**
   * Функция создания способности
   * @param abilityName - название созданной способности
   */
  public add(abilityName: string): void {
    const obj: IAbility = <IAbility>this._possibleAbilities.at(-1)
    let lid: number = obj.id;
    const newAbility: IAbility = {
        id: ++lid,
        name: abilityName,
    };
    this._possibleAbilities.push(newAbility);
    this._sendAbilities();
  }

  /**
   * Функция получения названий способностей по их id
   * @param heroAbilities - список id способностей героя
   */
  public getAbilityNamesByIds(heroAbilities: number[]): string[] {
    const abilitiesList: string[] = [];
    this._possibleAbilities.forEach((ability: IAbility) => {
      if (heroAbilities.includes(ability[EAbility.ID])) {
        abilitiesList.push(ability[EAbility.NAME]);
      }
    })
    return abilitiesList;
  }

  /**
   * Функция проверки способности на наличие дубликата
   * @param abilityName - название новой способности
   */
  public hasDuplicate(abilityName: string): boolean {
    return this._possibleAbilities.some(ability => ability[EAbility.NAME] === abilityName);
  }

  /**
   * Функция для первичного получения списка способностей
   */
  public getAbilities (): void {
    this._sendAbilities();
  }

  /**
   * Функция отправки списка способностей
   * @private
   */
  private _sendAbilities(): void {
    this._abilityStream$.next(this._possibleAbilities);
  }

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
}
