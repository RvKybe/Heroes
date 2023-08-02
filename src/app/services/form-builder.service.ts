import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EHero} from "../enums/hero.enum";
import {EFilters} from "../enums/filter-form.enum";
import {nonEmptyStringValidator} from "../validators/non-empty-string-validator";

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  /**
   * Возвращает форму для создания или редактирования героя
   * return {FormGroup}
   */
  public get heroForm(): FormGroup {
    return new FormGroup({
      [EHero.NAME]: new FormControl<string>('', [Validators.required, nonEmptyStringValidator()]),
      [EHero.POWER]: new FormControl<number | null>(null, Validators.required),
      [EHero.ABILITY_IDS]: new FormControl<number[]>([], Validators.required),
      [EHero.LEVEL]: new FormControl<number | null>(null, Validators.required),
      [EHero.ID]: new FormControl<number | null>(null),
    });
  }

  /**
   * Возвращает форму фильтрации героев
   * return {FormGroup}
   */
  public get filterForm(): FormGroup {
    return new FormGroup( {
      [EFilters.BOTTOM_LEVEL]: new FormControl(),
      [EFilters.TOP_LEVEL]: new FormControl(),
      [EFilters.ABILITIES]: new FormControl(),
      [EFilters.HERO_NAME]: new FormControl(),
      [EFilters.SORT_MODE]: new FormControl(1),
    });
  }
}
