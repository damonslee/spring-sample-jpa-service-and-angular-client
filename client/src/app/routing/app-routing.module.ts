import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonsListComponent } from '../components/persons-list/persons-list.component';
import { PersonEditComponent } from '../components/person-edit/person-edit.component';
import { PersonDeleteComponent } from '../components/person-delete/person-delete.component';

const appRoutes: Routes = [
	{ path: '', component: PersonsListComponent },
	{ path: 'list-persons', component: PersonsListComponent },
	{ path: 'new-person', component: PersonEditComponent, data: { action: 'new' } },
	{ path: 'modify-person/:id', component: PersonEditComponent, data: { action: 'modify' } },
	{ path: 'delete-person/:id', component: PersonDeleteComponent, data: { action: 'delete' } }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, { useHash: true })
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
