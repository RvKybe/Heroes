import {Injectable} from '@angular/core';
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
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

    constructor (private readonly _http: HttpClient) {this.getAbilities()}

    /**
     * todo
     */
    public  getAbilities(): void {
        lastValueFrom(this._http.get(LRequest.GET_ABILITIES)).then((res: any) => {
            this._abilities$$.next(res);
        });
    }

    /**
     * todo
     */
    public postAbility(ability: {[LItem.NAME]: string}): void {
        fetch(LRequest.POST_ABILITY, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ability)
        }).then();
    }

    /**
     * Функция создания способности
     *
     * @param {string} abilityName - название созданной способности
     */
    public add(abilityName: string): void {
        const newAbility: {[LItem.NAME]: string} = {
            [LItem.NAME]: abilityName,
        };
        this.postAbility(newAbility);
        this.getAbilities();
    }

    /**
     * Функция проверки способности на наличие дубликата
     *
     * @param {string} abilityName - название новой способности
     * @return {boolean}
     */
    public hasDuplicate(abilityName: string): boolean {
        const abilities: IItem[] = this._abilities$$.getValue();
        return abilities.some((ability: IItem) => ability[LItem.NAME] === abilityName);
    }
}
