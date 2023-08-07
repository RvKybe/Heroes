import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {
    DxAccordionModule,
    DxButtonModule, DxNumberBoxModule,
    DxPopupModule, DxScrollViewModule,
    DxSelectBoxModule,
    DxTagBoxModule,
    DxTextBoxModule
} from "devextreme-angular";
import {CreateHeroFormComponent} from './entities/components/create-hero-form/create-hero-form.component';
import {CreateAbilityFormComponent} from './entities/components/create-ability-form/create-ability-form.component';
import {FiltersFormComponent} from './entities/components/filters-form/filters-form.component';
import {OutputContainerComponent} from './entities/components/output-container/output-container.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GetAbilityNameByIdPipe} from './entities/pipes/get-abilities-names-by-ids.pipe';

@NgModule({
    declarations: [
        AppComponent,
        CreateHeroFormComponent,
        CreateAbilityFormComponent,
        FiltersFormComponent,
        OutputContainerComponent,
        GetAbilityNameByIdPipe,
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
        DxNumberBoxModule,
        DxScrollViewModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
