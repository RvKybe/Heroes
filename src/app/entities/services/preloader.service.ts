import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PreloaderService {
    private _isVisible$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isVisible$: Observable<boolean> = this._isVisible$$ as Observable<boolean>;

    /**
     * Передаёт значение в поток
     * @param value - значение видимости прелоадера
     */
    public set visible(value: boolean) {
        this._isVisible$$.next(value);
    }
}