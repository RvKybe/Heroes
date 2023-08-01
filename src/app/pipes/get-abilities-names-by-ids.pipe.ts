import {OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {IAbility} from "../interfaces/ability.interface";
import {ManageAbilitiesService} from "../services/manage-abilities.service";
import {Subscription} from "rxjs";

@Pipe({
  name: 'getAbilitiesNamesByIds'
})
export class GetAbilitiesNamesByIdsPipe implements PipeTransform, OnDestroy {
  public sb!: Subscription;
  constructor(
    private readonly _manageAbilitiesService: ManageAbilitiesService
  ) {
    this.sb = this._manageAbilitiesService.abilityStream$.subscribe((abilities: IAbility[]) => {
      this.possibleAbilities = abilities;
    });
  }
  public possibleAbilities!: IAbility[];
  public transform(heroAbility: number): string {
    const a: IAbility =  <IAbility>this.possibleAbilities.find((ability: IAbility): boolean => {
      return ability.id === heroAbility;
    });
    return a.name;
  }
  public ngOnDestroy(): void {
    this.sb.unsubscribe();
  }
}
