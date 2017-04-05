import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ConfigurationService } from './services/configuration.service';
import { PersonsService } from './services/persons.service';

import { AppComponent } from './app.component';
import { PersonsListComponent } from './components/persons-list/persons-list.component';
import { UiTableNavigatorComponent } from './components/ui-table-navigator/ui-table-navigator.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsListComponent,
    UiTableNavigatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ConfigurationService,
    PersonsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
