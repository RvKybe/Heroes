import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IItem} from "../interfaces/item.interface";
import {LItem} from "../labels/item.label";
import {LRequest} from "../labels/request.label";
import {HttpClient} from "@angular/common/http";
import {PreloaderService} from "./preloader.service";

@Injectable({
    providedIn: 'root'
})
export class ManageAbilitiesService {
    private _abilities$$: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);
    public abilities$: Observable<IItem[]> = this._abilities$$.asObservable();

    constructor (private readonly _httpClient: HttpClient,
                 private readonly _preloaderService: PreloaderService
    ) {
    }

    /**
     * Создание способности
     *
     * @param {string} abilityName - название созданной способности
     */
    public add(abilityName: string): void {
        const newAbility: Record<LItem.NAME, string> = {
            [LItem.NAME]: abilityName
        };
        this._httpClient.post<IItem>(LRequest.POST_ABILITY, newAbility).subscribe(() => {
            this.getAll();
        });
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
     * GET - запрос способностей
     */
    public getAll(): void {
        this._preloaderService.visible = true;
        this._httpClient.get<IItem[]>(LRequest.GET_ABILITIES).subscribe((abilities: IItem[]) => {
            this._abilities$$.next(abilities);
            this._preloaderService.visible = false;
        });
    }
}
