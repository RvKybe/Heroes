import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {
    DxAccordionModule,
    DxButtonModule, DxLoadIndicatorModule, DxLoadPanelModule, DxNumberBoxModule,
    DxPopupModule, DxScrollViewModule,
    DxSelectBoxModule,
    DxTagBoxModule,
    DxTextBoxModule
} from "devextreme-angular";
import {HeroFormComponent} from './entities/components/hero-form/hero-form.component';
import {CreateAbilityFormComponent} from './entities/components/create-ability-form/create-ability-form.component';
import {FiltersFormComponent} from './entities/components/filters-form/filters-form.component';
import {OutputContainerComponent} from './entities/components/output-container/output-container.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GetAbilityNameByIdPipe} from './entities/pipes/get-ability-name-by-id.pipe';
import {HttpClientModule} from "@angular/common/http";
import {PreloaderComponent} from "./entities/components/preloader/preloader.component";

@NgModule({
    declarations: [
        AppComponent,
        HeroFormComponent,
        CreateAbilityFormComponent,
        FiltersFormComponent,
        OutputContainerComponent,
        GetAbilityNameByIdPipe,
        PreloaderComponent
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
        DxScrollViewModule,
        HttpClientModule,
        DxLoadIndicatorModule,
        DxLoadPanelModule
    ],
    providers: [HttpClientModule ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
