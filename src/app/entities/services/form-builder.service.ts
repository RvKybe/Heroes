import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {LHero} from "../labels/hero.label";
import {LFilterForm} from "../labels/filter-form.label";
import {LItem} from "../labels/item.label";

@Injectable({
    providedIn: 'root'
})
export class FormBuilderService {
    private _formBuilder: NonNullableFormBuilder = new FormBuilder().nonNullable;
    /**
     * Возвращает форму для создания или редактирования героя
     * @return {FormGroup}
     */
    public get heroForm(): FormGroup {
        return this._formBuilder.group({
            [LItem.ID]: null,
            [LItem.NAME]: ['', Validators.required],
            [LHero.POWER]: [null, Validators.required],
            [LHero.ABILITY_IDS]: [[], Validators.required],
            [LHero.LEVEL]: [null, Validators.required],
        });
    }

    /**
     * Возвращает форму фильтрации героев
     * @return {FormGroup}
     */
    public get filterForm(): FormGroup {
        return this._formBuilder.group({
            [LFilterForm.BOTTOM_LEVEL]: null,
            [LFilterForm.TOP_LEVEL]: null,
            [LFilterForm.ABILITY_IDS]: [],
            [LFilterForm.HERO_NAME]: '',
            [LFilterForm.SORT_MODE]: 1,
        });
    }

    /**
     * Возвращает контроллер формы создания способности
     * @return {FormControl<string>}
     */
    public get createAbilityFormControl(): FormControl<string> {
        return this._formBuilder.control('', Validators.required) as FormControl;
    }
}
