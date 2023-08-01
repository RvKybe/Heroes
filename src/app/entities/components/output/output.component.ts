import {Component, OnDestroy, OnInit} from '@angular/core';
import {ManageHeroesService} from "../../../services/manage-heroes.service";
import {IHero} from "../../../interfaces/hero.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit, OnDestroy {
  public heroes:IHero[] = [];
  private subscription!: Subscription;

  constructor(
      private readonly _manageHeroService: ManageHeroesService
  ) {}

  public ngOnInit(): void {
    this.subscription = this._manageHeroService.heroesStream$.subscribe((item: IHero[]) => this.heroes = item);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
