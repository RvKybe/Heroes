import {Component, DestroyRef, OnInit} from '@angular/core';
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {IHero} from "../../interfaces/hero.interface";
import {Observable} from "rxjs";
import {FilterFormService} from "../../services/filter-form.service";
import {IFilterForm} from "../../interfaces/filter-form.interface";
import {LHero} from "../../labels/hero.label";
import {LItem} from "../../labels/item.label";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {IItem} from "../../interfaces/item.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {EHeroFormMode} from "../../enums/hero-form-mode.enum";

@Component({
    selector: 'app-output-container',
    templateUrl: './output-container.component.html',
    styleUrls: ['./output-container.component.scss']
})
export class OutputContainerComponent implements OnInit {
    public abilities$: Observable<IItem[]> = this._manageAbilitiesService.abilities$;
    public heroes!: IHero[];
    public filterFormValue!: IFilterForm;
    public selectedHero!: IHero;
    public isVisible: boolean = false;

    private _selectedHeroId!: number;

    protected readonly LHero: typeof LHero = LHero;
    protected readonly LItem: typeof LItem = LItem;
    protected readonly EHeroFormMode = EHeroFormMode;

    constructor(
        private readonly _manageHeroesService: ManageHeroesService,
        private readonly _filterFormService: FilterFormService,
        private readonly _manageAbilitiesService: ManageAbilitiesService,
        private readonly _destroyRef: DestroyRef
    ) {}

    public ngOnInit(): void {
        this._filterFormService.form$.pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((filterFormValue: IFilterForm) => {
                this.filterFormValue = filterFormValue;
            });
        this._manageHeroesService.heroes$.pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((heroes: IHero[]) => {
                this.heroes = this._manageHeroesService.filterHeroes(heroes, this.filterFormValue);
                this.selectedHero = this._selectedHero;
            });
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
     * Изменяет видимость попапа
     * @param {boolean} isVisible - целевое состояние попапа
     */
    public switchPopupVisible(isVisible: boolean): void {
        this.isVisible = isVisible;
    }

    /**
     * Возвращает выбранного героя
     * @private
     */
    private get _selectedHero(): IHero {
        return <IHero>this.heroes.find((hero: IHero) => {
            return hero[LItem.ID] === this._selectedHeroId;
        });
    }
}
