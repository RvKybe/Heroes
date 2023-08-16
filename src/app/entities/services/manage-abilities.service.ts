import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IItem} from "../interfaces/item.interface";
import {LItem} from "../labels/item.label";
import {LRequest} from "../labels/request.label";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ManageAbilitiesService {
    private _abilities$$: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);
    public abilities$: Observable<IItem[]> = this._abilities$$.asObservable();
    private _preloaderIsVisible$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public showPreloader$: Observable<boolean> = this._preloaderIsVisible$$.asObservable();

    constructor (private readonly _httpClient: HttpClient) {
    }

    /**
     * Создание способности
     *
     * @param {string} abilityName - название созданной способности
     */
    public add(abilityName: string): void {
        const newAbility: {[LItem.NAME]: string} = {
            [LItem.NAME]: abilityName,
        };
        this._postAbility(newAbility)
            .then(() => this._getAbilities());
    }

    /**
     * Проверка способности на наличие дубликата
     *
     * @param {string} abilityName - название новой способности
     * @return {boolean}
     */
    public hasDuplicate(abilityName: string): boolean {
        const abilities: IItem[] = this._abilities$$.getValue();
        return abilities.some((ability: IItem) => ability[LItem.NAME] === abilityName);
    }

    /**
     * Первичное получение способностей
     */
    public getAbilities(): void {
        this._getAbilities();
    }

    /**
     * GET - запрос способностей
     *
     * @private
     */
    private _getAbilities(): void {
        this._preloaderIsVisible$$.next(true);
        this._httpClient.get<IItem[]>(LRequest.GET_ABILITIES).subscribe((abilitiesFromBack: IItem[]) => {
            this._abilities$$.next(abilitiesFromBack);
            this._preloaderIsVisible$$.next(false);
        });
    }

    /**
     * GET - запрос способностей
     *
     * @param {{[LItem.NAME]: string}} ability - название способности
     * @private
     */
    private async _postAbility(ability: {[LItem.NAME]: string}): Promise<void> {
        this._httpClient.post(LRequest.POST_ABILITY, ability).subscribe();
    }
}
