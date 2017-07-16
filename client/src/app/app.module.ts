import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './routing/app-routing.module';

import { TranslationService } from './services/translation.service';
import { PersonsService } from './services/persons.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PersonsListComponent } from './components/persons-list/persons-list.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonDeleteComponent } from './components/person-delete/person-delete.component';
import { UiErrorsPanelComponent } from './components/ui-errors-panel/ui-errors-panel.component';
import { UiTableNavigatorComponent } from './components/ui-table-navigator/ui-table-navigator.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		PersonsListComponent,
		PersonEditComponent,
		PersonDeleteComponent,
		UiErrorsPanelComponent,
		UiTableNavigatorComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		AppRoutingModule
	],
	providers: [
		TranslationService,
		PersonsService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
