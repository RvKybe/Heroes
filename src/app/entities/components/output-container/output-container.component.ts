import {Component, OnDestroy, OnInit} from '@angular/core';
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {IHero} from "../../interfaces/hero.interface";
import {Observable, Subscription} from "rxjs";
import {FilterFormService} from "../../services/filter-form.service";
import {IFilterForm} from "../../interfaces/filter-form.interface";
import {LHero} from "../../labels/hero.label";
import {LItem} from "../../labels/item.label";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {IItem} from "../../interfaces/item.interface";

@Component({
    selector: 'app-output-container',
    templateUrl: './output-container.component.html',
    styleUrls: ['./output-container.component.scss']
})
export class OutputContainerComponent implements OnInit, OnDestroy {
    public abilities$: Observable<IItem[]> = this._manageAbilitiesService.abilities$;
    public heroes!: IHero[];
    public filterFormValue!: IFilterForm;
    public selectedHero!: IHero;

    private _selectedHeroId!: number;
    private _heroesSubscription!: Subscription;
    private _filterFormSubscription!: Subscription;

    protected readonly LHero: typeof LHero = LHero;
    protected readonly LItem: typeof LItem = LItem;

    constructor(
        private readonly _manageHeroesService: ManageHeroesService,
        private readonly _filterFormService: FilterFormService,
        private readonly _manageAbilitiesService: ManageAbilitiesService
    ) {}

    public ngOnInit(): void {
        this._filterFormSubscription = this._filterFormService.form$
            .subscribe((filterFormValue: IFilterForm) => {
                this.filterFormValue = filterFormValue;
            })
        this._heroesSubscription = this._manageHeroesService.heroes$
            .subscribe((heroes: IHero[]) => {
                this.heroes = this._manageHeroesService.filterHeroes(heroes, this.filterFormValue);
                this.selectedHero = this._selectedHero;
            })
    }

    /**
     * Меняет выбранного героя
     * @param {IHero} newSelectedHero - выбранный герой
     */
    public switchSelectedHero(newSelectedHero: IHero): void {
        this._selectedHeroId = newSelectedHero[LItem.ID];
        this.selectedHero = this._selectedHero;
    }

    /**
     * Возвращает выбранного героя
     *
     * @private
     */
    private get _selectedHero(): IHero {
        return <IHero>this.heroes.find((hero: IHero) => {
            return hero[LItem.ID] === this._selectedHeroId;
        });
    }

    public ngOnDestroy(): void {
        this._heroesSubscription.unsubscribe();
        this._filterFormSubscription.unsubscribe();
    }
}
