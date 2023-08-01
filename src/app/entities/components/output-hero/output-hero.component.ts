import {Component, Input, OnInit} from '@angular/core';
import {IHero} from "../../../interfaces/hero.interface";
import {ManageAbilitiesService} from "../../../services/manage-abilities.service";
import {EHero} from "../../../enums/hero.enum";

@Component({
    selector: 'app-output-hero',
    templateUrl: './output-hero.component.html',
    styleUrls: ['./output-hero.component.scss']
})
export class OutputHeroComponent implements OnInit {
  @Input()
  public hero!: IHero;

  public isVisible: boolean = false;
  public icon: string = 'chevrondown';
  public abilityNames: string[] = [];
  public popupVisible: boolean = false;

  constructor(
    private readonly _manageAbilitiesService: ManageAbilitiesService
  ) {}

  public ngOnInit(): void {
    this.abilityNames = this._manageAbilitiesService.getAbilityNamesByIds(this.hero[EHero.ABILITY_IDS]);
  }

  /**
   * Функция смены иконки в кнопке сортировки
   */
  public changeDisplay(): void {
    this.isVisible = !this.isVisible;
    this.icon = this.isVisible ? 'chevronup' : 'chevrondown';
  }

  /**
   * Функция, которая переключает режим отображения окна редактирования героя
   * @param {boolean} popupVisible - нужный режим отображения
   */
  public switchPopupDisplay(popupVisible: boolean): void {
    this.popupVisible = popupVisible;
  }
}
