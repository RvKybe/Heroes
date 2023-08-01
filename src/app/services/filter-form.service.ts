import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {IFilterFormValue} from "../interfaces/filterForm.interface";

@Injectable({
  providedIn: 'root'
})
export class FilterFormService{
  private _filterFormStream$: Subject<IFilterFormValue>  = new Subject<IFilterFormValue>();
  public filterFormStream$: Observable<IFilterFormValue> = this._filterFormStream$.asObservable();

  public set form(form: IFilterFormValue) {
    this._filterFormStream$.next(form);
  }
}
