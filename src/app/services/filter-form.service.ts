import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FilterFormService{
  private _filterFormStream$: Subject<FormGroup>  = new Subject<FormGroup>();
  public filterFormStream$: Observable<FormGroup> = this._filterFormStream$.asObservable();

  public set form(form: FormGroup) {
    this._filterFormStream$.next(form);
  }
}
