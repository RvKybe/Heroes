import {Component} from '@angular/core';
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {IHero} from "../../interfaces/hero.interface";
import {Observable} from "rxjs";
import {FilterFormService} from "../../services/filter-form.service";
import {IFilterForm} from "../../interfaces/filter-form.interface";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent {
  public heroes$: Observable<IHero[]> = this._manageHeroesService.heroesStream$;
  public filterFormValue$: Observable<IFilterForm> = this._filterFormService.form$;

  constructor(
      private readonly _manageHeroesService: ManageHeroesService,
      private readonly _filterFormService: FilterFormService
  ) {}
}
