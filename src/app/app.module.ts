import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {
    DxAccordionModule,
    DxButtonModule, DxNumberBoxModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxTagBoxModule,
    DxTextBoxModule
} from "devextreme-angular";
import {CreateHeroComponent} from './entities/components/create-hero/create-hero.component';
import {CreateAbilityComponent} from './entities/components/create-ability/create-ability.component';
import {FiltersComponent} from './entities/components/filters/filters.component';
import {OutputComponent} from './entities/components/output/output.component';
import {OutputHeroComponent} from './entities/components/output-hero/output-hero.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GetAbilitiesNamesByIdsPipe} from './entities/pipes/get-abilities-names-by-ids.pipe';
import {FilterHeroesPipe} from './entities/pipes/filter-heroes.pipe';

@NgModule({
    declarations: [
        AppComponent,
        CreateHeroComponent,
        CreateAbilityComponent,
        FiltersComponent,
        OutputComponent,
        OutputHeroComponent,
        GetAbilitiesNamesByIdsPipe,
        FilterHeroesPipe
    ],
    imports: [
        BrowserModule,
        DxTextBoxModule,
        DxSelectBoxModule,
        DxButtonModule,
        ReactiveFormsModule,
        FormsModule,
        DxTagBoxModule,
        DxPopupModule,
        DxAccordionModule,
        DxNumberBoxModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
