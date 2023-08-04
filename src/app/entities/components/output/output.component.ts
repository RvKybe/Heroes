import {Component, OnDestroy, OnInit} from '@angular/core';
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {IHero} from "../../interfaces/hero.interface";
import {Subscription} from "rxjs";
import {FilterFormService} from "../../services/filter-form.service";
import {IFilterForm} from "../../interfaces/filter-form.interface";
import {LHero} from "../../labels/hero.label";
import {LItem} from "../../labels/item.label";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {IItem} from "../../interfaces/item.interface";

@Component({
    selector: 'app-output',
    templateUrl: './output.component.html',
    styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit, OnDestroy {
    public possibleAbilities!: IItem[];
    public heroes!: IHero[];
    public filterFormValue!: IFilterForm;

    private _heroesSubscription!: Subscription;
    private _abilitiesSubscription!: Subscription;
    private _filterFormSubscription!: Subscription;

    protected readonly LHero = LHero;
    protected readonly LItem = LItem;

    constructor(
        private readonly _manageHeroesService: ManageHeroesService,
        private readonly _filterFormService: FilterFormService,
        private readonly _manageAbilitiesService: ManageAbilitiesService
    ) {}

    public ngOnInit(): void {
        this._abilitiesSubscription = this._manageAbilitiesService.abilities$
            .subscribe((abilities: IItem[]): void => {
                this.possibleAbilities = abilities;
            })
        this._filterFormSubscription = this._filterFormService.form$
            .subscribe((filterFormValue: IFilterForm): void => {
                this.filterFormValue = filterFormValue;
            })
        this._heroesSubscription = this._manageHeroesService.heroesStream$
            .subscribe((heroes: IHero[]): void => {
                this.heroes = this._manageHeroesService.filterHeroes(heroes, this.filterFormValue);
            })
    }

    public ngOnDestroy(): void {
        this._heroesSubscription.unsubscribe();
        this._abilitiesSubscription.unsubscribe();
        this._filterFormSubscription.unsubscribe();
    }
}
