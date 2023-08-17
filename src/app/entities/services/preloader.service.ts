import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PreloaderService {
    private _isVisible$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isVisible$: Observable<boolean> = this._isVisible$$ as Observable<boolean>;

    private _counter: number = 0;

    /**
     * Передаёт значение в поток
     * @param {boolean} isVisible - значение видимости прелоадера
     */
    public set isVisible(isVisible: boolean) {
        isVisible ? this._counter++ : this._counter--;
        this._counter > 0 ? this._isVisible$$.next(true) : this._isVisible$$.next(false);
    }
}