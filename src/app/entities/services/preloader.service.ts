import {Injectable, OnDestroy} from "@angular/core";
import {ManageHeroesService} from "./manage-heroes.service";
import {ManageAbilitiesService} from "./manage-abilities.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PreloaderService implements OnDestroy {
    private _isVisible$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isVisible$: Observable<boolean> = this._isVisible$$ as Observable<boolean>;

    private _heroesPreloaderSubscription: Subscription = this._manageHeroesService.showPreloader$
        .subscribe((value: boolean) => {
            if (value !== this._isVisible$$.getValue()) {
                this._isVisible$$.next(value);

            }
        });
    private _abilitiesPreloaderSubscription: Subscription = this._manageAbilitiesService.showPreloader$
        .subscribe((value: boolean) => {
            if (value !== this._isVisible$$.getValue()) {
                this._isVisible$$.next(value);
            }
        });

    constructor (
        private readonly _manageHeroesService: ManageHeroesService,
        private readonly _manageAbilitiesService: ManageAbilitiesService
    ) {}

    public ngOnDestroy(): void {
        this._abilitiesPreloaderSubscription.unsubscribe();
        this._heroesPreloaderSubscription.unsubscribe();
    }
}