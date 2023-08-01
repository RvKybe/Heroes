import {OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {IAbility} from "../interfaces/ability.interface";
import {ManageAbilitiesService} from "../services/manage-abilities.service";
import {Subscription} from "rxjs";

@Pipe({
  name: 'getAbilitiesNamesByIds'
})
export class GetAbilitiesNamesByIdsPipe implements PipeTransform, OnDestroy {
  public abilitySubscription!: Subscription;
  public possibleAbilities: IAbility[] = [];

  constructor(
    private readonly _manageAbilitiesService: ManageAbilitiesService
  ) {
    this.abilitySubscription = this._manageAbilitiesService.abilityStream$.subscribe((abilities: IAbility[]): void => {
      this.possibleAbilities = abilities;
    });
  }

  public ngOnDestroy(): void {
    this.abilitySubscription.unsubscribe();
  }

  /**
   *  Пайп, который возвращает имена способностей героя по id способностей
   * @param heroAbility - id способности
   * return {string}
   */
  public transform(heroAbility: number): string {
    const a: IAbility =  <IAbility>this.possibleAbilities.find((ability: IAbility): boolean => {
      return ability.id === heroAbility;
    });
    return a.name;
  }
}
