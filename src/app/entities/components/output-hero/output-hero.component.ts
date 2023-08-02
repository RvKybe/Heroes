import {Component, Input, OnInit} from '@angular/core';
import {IHero} from "../../../interfaces/hero.interface";

@Component({
    selector: 'app-output-hero',
    templateUrl: './output-hero.component.html',
    styleUrls: ['./output-hero.component.scss']
})
export class OutputHeroComponent implements OnInit {
  @Input()
  public hero!: IHero;

  public outputHero: IHero[] = [];
  public popupVisible: boolean = false;

  constructor() {}

  public ngOnInit(): void {
    this.outputHero.push(this.hero);
  }

  /**
   * Функция, которая переключает режим отображения окна редактирования героя
   * @param {boolean} popupVisible - нужный режим отображения
   */
  public switchPopupDisplay(popupVisible: boolean): void {
    this.popupVisible = popupVisible;
  }
}
