import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EHero} from "../enums/hero.enum";
import {numberValidator} from "../validators/number-validator.validator";
import {EFilters} from "../enums/filterFrom.enum";

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
      [EHero.NAME]: new FormControl<string>('', Validators.required),
      [EHero.POWER]: new FormControl<number | null>(null, [Validators.required, numberValidator()]),
      [EHero.ABILITY_IDS]: new FormControl<number[]>([], Validators.required),
      [EHero.LEVEL]: new FormControl<number | null>(null, [Validators.required, numberValidator()]),
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
