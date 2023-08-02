import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, } from "@angular/forms";
import {ManageHeroesService} from "../../../services/manage-heroes.service";
import {ManageAbilitiesService} from "../../../services/manage-abilities.service";
import {IHero} from "../../../interfaces/hero.interface";
import {IAbility} from "../../../interfaces/ability.interface";
import {Observable} from "rxjs";
import {EHero} from "../../../enums/hero.enum";
import {FormBuilderService} from "../../../services/form-builder.service";

@Component({
    selector: 'app-create-hero',
    templateUrl: './create-hero.component.html',
    styleUrls: ['./create-hero.component.scss']
})
export class CreateHeroComponent implements OnInit {
  @Input('mode')
  public mode: string = '';
  @Input('hero')
  public hero!: IHero;

  public form: FormGroup = this._formBuilderService.heroForm;

  public abilities$!: Observable<IAbility[]>;
  public submitButtonText: string = '';
  public errorMessage: string = '';

  constructor(
    private readonly _manageHeroesService: ManageHeroesService,
    private readonly _manageAbilitiesService: ManageAbilitiesService,
    private readonly _formBuilderService: FormBuilderService,
  ) {}

  public ngOnInit(): void {
    this.abilities$ = this._manageAbilitiesService.abilityStream$;
    if (this.mode === 'create') {
      this.submitButtonText = 'Создать героя';
    } else {
      this.submitButtonText = 'Изменить героя';
      this.form.patchValue(this.hero);
    }
  }

  /**
   * Функция отправки формы
   */
  public submit(): void {
    this.errorMessage = '';
    const heroId: number | null = this.hero ? <number>this.hero.id : null;
    const hasDuplicate: boolean = this._manageHeroesService.hasDuplicate(<string>this.form.value.name, heroId);
    if (hasDuplicate) {
      this.errorMessage = 'Такой герой уже существует';
      return;
    }
    if (!this.form.valid) {
      return;
    }
    if (this.mode === 'create') {
      this._manageHeroesService.add(<IHero>this.form.value);
    } else if (this.mode === 'edit') {
      this._manageHeroesService.edit(<IHero>this.form.value);
    }
    this.form.reset();
  }

  /**
   * Возвращает контроллер name формы
   * return {FormControl}
   */
  public get nameFormControl(): FormControl<string | null> {
      return this.form.get(`${[EHero.NAME]}`) as FormControl<string | null>;
  }

  /**
   * Возвращает контроллер power формы
   * return {FormControl}
   */
  public get powerFormControl(): FormControl<string | null> {
      return this.form.get(`${[EHero.POWER]}`) as FormControl<string | null>;
  }

  /**
   * Возвращает контроллер abilities формы
   * return {FormControl}
   */
  public get abilityFormControl(): FormControl<string | null> {
      return this.form.get(`${[EHero.ABILITY_IDS]}`) as FormControl<string | null>;
  }

  /**
   * Возвращает контроллер level формы
   * return {FormControl}
   */
  public get levelFormControl(): FormControl<string | null> {
      return this.form.get(`${[EHero.LEVEL]}`) as FormControl<string | null>;
  }
}
