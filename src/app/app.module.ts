import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {DxButtonModule, DxPopupModule, DxSelectBoxModule, DxTagBoxModule, DxTextBoxModule} from "devextreme-angular";
import { CreateHeroComponent } from './entities/components/create-hero/create-hero.component';
import { CreateAbilityComponent } from './entities/components/create-ability/create-ability.component';
import { FiltersComponent } from './entities/components/filters/filters.component';
import { OutputComponent } from './entities/components/output/output.component';
import { OutputHeroComponent } from './entities/components/output-hero/output-hero.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GetAbilitiesNamesByIdsPipe } from './pipes/get-abilities-names-by-ids.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CreateHeroComponent,
    CreateAbilityComponent,
    FiltersComponent,
    OutputComponent,
    OutputHeroComponent,
    GetAbilitiesNamesByIdsPipe,
  ],
  imports: [
    BrowserModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DxTagBoxModule,
    DxPopupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
