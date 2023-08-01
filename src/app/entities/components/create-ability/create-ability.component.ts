import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ManageAbilitiesService} from "../../../services/manage-abilities.service";

@Component({
  selector: 'app-create-ability',
  templateUrl: './create-ability.component.html',
  styleUrls: ['./create-ability.component.scss']
})
export class CreateAbilityComponent {
  public abilityName: FormControl = new FormControl<string | null>(null, Validators.required);

  public errorMessage: string = '';

  constructor(
      private readonly _manageAbilitiesServices: ManageAbilitiesService
  ) {}

  /**
   * Функция создания способности героя.
   */
  public createAbility(): void {
    this.errorMessage = '';
    const hasDuplicate: boolean = this._manageAbilitiesServices.hasDuplicate(<string>this.abilityName.value.abilityName);
    if (this.abilityName.valid && !hasDuplicate) {
      this._manageAbilitiesServices.add(<string>this.abilityName.value.abilityName);
      this.abilityName.reset();
    }
    if (hasDuplicate) {
      this.errorMessage = 'Такая способность уже существует';
    }
  }

  /**
   * Возвращает контроллер AbilityName формы
   * return {FormControl}
   */
  public get abilityNameFormControl(): FormControl {
    return this.abilityName;
  }
}
