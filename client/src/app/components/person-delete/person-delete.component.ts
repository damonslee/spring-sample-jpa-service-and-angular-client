import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Person } from '../../types/person';
import { TranslationService } from '../../services/translation.service';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'person-delete',
  templateUrl: './person-delete.component.html',
  styleUrls: ['./person-delete.component.css']
})
export class PersonDeleteComponent implements OnInit {
	public errorsList: Array<string>;
	public data: {
		action: string,
		personId: number
	}
	public person: Person;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public translationService: TranslationService,
		private personsService: PersonsService,
	) {
		this.errorsList = [];
		this.data = {
			action: '',
			personId: null
		};
		this.person = undefined;
	}
	ngOnInit(): void {
		this.route.data.subscribe((data: {action: string}) => {
			this.data.action = data.action;
			if (this.data.action === 'delete') {
				this.route.params.subscribe((params: {id: number}) => {
					this.data.personId = params.id;

					this.personsService.findById(this.data.personId).subscribe(value => {
						this.person = value.data;
					}, error => {
						this.errorsList.push(error);
					});
				});
			}
		}, error => {
			this.errorsList.push(error);
		});
	}
	public submitForm(): void {
		this.personsService.delete(this.data.personId).subscribe(value => {
			this.router.navigate(['/']);
		}, error => {
			this.errorsList.push(error);
		});
	}
	public cancel(): void {
		this.router.navigate(['/']);
	}
}
