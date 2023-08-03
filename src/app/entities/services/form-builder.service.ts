import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LHero} from "../labels/hero.label";
import {LFilterForm} from "../labels/filter-form.label";
import {nonEmptyStringValidator} from "../validators/non-empty-string.validator";
import {LItem} from "../labels/item.label";

@Injectable({
    providedIn: 'root'
})
export class FormBuilderService {
    /**
     * Возвращает форму для создания или редактирования героя
     *
     * return {FormGroup}
     */
    public get heroForm(): FormGroup {
        return new FormGroup({
            [LItem.ID]: new FormControl<number | null>(null),
            [LItem.NAME]: new FormControl<string>('', [Validators.required, nonEmptyStringValidator()]),
            [LHero.POWER]: new FormControl<number | null>(null, Validators.required),
            [LHero.ABILITY_IDS]: new FormControl<number[]>([], Validators.required),
            [LHero.LEVEL]: new FormControl<number | null>(null, Validators.required),
        });
    }

    /**
     * Возвращает форму фильтрации героев
     *
     * return {FormGroup}
     */
    public get filterForm(): FormGroup {
        return new FormGroup({
            [LFilterForm.BOTTOM_LEVEL]: new FormControl(),
            [LFilterForm.TOP_LEVEL]: new FormControl(),
            [LFilterForm.ABILITY_IDS]: new FormControl(),
            [LFilterForm.HERO_NAME]: new FormControl(),
            [LFilterForm.SORT_MODE]: new FormControl(1),
        });
    }

    /**
     * Возвращает контроллер формы создания способности
     *
     * return {FormControl<string | null>}
     */
    public get createAbilityFormControl(): FormControl<string | null> {
        return new FormControl<string | null>(null, [Validators.required, nonEmptyStringValidator()])
    }
}
