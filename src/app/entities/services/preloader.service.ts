import {Injectable, OnDestroy} from "@angular/core";
import {ManageHeroesService} from "./manage-heroes.service";
import {ManageAbilitiesService} from "./manage-abilities.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PreloaderService implements OnDestroy{
    private _preloaderIsVisible$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public IsVisible$: Observable<boolean> = this._preloaderIsVisible$$ as Observable<boolean>;
    constructor (
        private readonly _manageHeroesService: ManageHeroesService,
        private readonly _manageAbilitiesService: ManageAbilitiesService
    ) {}

    private _heroesPreloaderSubscription: Subscription = this._manageHeroesService.showPreloader$
        .subscribe((value: boolean) => {
            if (value !== this._preloaderIsVisible$$.getValue()) {
                this._preloaderIsVisible$$.next(value);

            }
        });
    private _abilitiesPreloaderSubscription: Subscription = this._manageAbilitiesService.showPreloader$
        .subscribe((value: boolean) => {
            if (value !== this._preloaderIsVisible$$.getValue()) {
                this._preloaderIsVisible$$.next(value);
            }
        });

    public ngOnDestroy(): void {
        this._abilitiesPreloaderSubscription.unsubscribe();
        this._heroesPreloaderSubscription.unsubscribe();
    }
}