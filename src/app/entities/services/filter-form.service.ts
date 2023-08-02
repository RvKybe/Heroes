import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {IFilterForm} from "../interfaces/filter-form.interface";

@Injectable({
  providedIn: 'root'
})
export class FilterFormService {
  private _form$$: ReplaySubject<IFilterForm> = new ReplaySubject<IFilterForm>(1);
  public form$: Observable<IFilterForm> = this._form$$.asObservable();

  /**
   * Сеттер для передачи значения формы слушателям
   * @param {IFilterForm} formValue - значение формы фильтрации
   */
  public set form(formValue: IFilterForm) {
    this._form$$.next(formValue);
  }
}
