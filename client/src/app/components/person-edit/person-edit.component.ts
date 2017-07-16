import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Person } from '../../types/person';
import { TranslationService } from '../../services/translation.service';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
	public errorsList: Array<string>;
	private editForm: FormGroup;
	public data: {
		action: string,
		personId: number
	}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		public translationService: TranslationService,
		private personsService: PersonsService,
	) {
		this.editForm = formBuilder.group({
			'lastName': [null, Validators.compose([Validators.required, Validators.maxLength(35)])],
			'firstName': [null, Validators.compose([Validators.required, Validators.maxLength(35)])],
			'socialNumber': [null, Validators.compose([Validators.maxLength(35)])],
			'telephone': [null, Validators.compose([Validators.maxLength(35)])],
			'birthDate': [null, Validators.compose([Validators.maxLength(10)])],
			'city': [null, Validators.compose([Validators.maxLength(35)])]
		});

		this.errorsList = [];
		this.data = {
			action: '',
			personId: null
		};
	}
	ngOnInit(): void {
		this.route.data.subscribe((data: {action: string}) => {
			this.data.action = data.action;
			if (this.data.action === 'modify') {
				this.route.params.subscribe((params: {id: number}) => {
					this.data.personId = params.id;

					this.personsService.findById(this.data.personId).subscribe(value => {
						this.editForm.get('lastName').setValue(value.data.lastName);
						this.editForm.get('firstName').setValue(value.data.firstName);
						this.editForm.get('socialNumber').setValue(value.data.socialNumber);
						this.editForm.get('telephone').setValue(value.data.telephone);
						this.editForm.get('birthDate').setValue(value.data.birthDate);
						this.editForm.get('city').setValue(value.data.city);
					}, error => {
						this.errorsList.push(error);
					});
				});
			}
		}, error => {
			this.errorsList.push(error);
		});
	}
	private checkForm(): boolean {
		this.errorsList = [];

		if (this.editForm.get('lastName').value.toString().trim() === '') {
			this.errorsList.push('no value in field "Last Name"');
		}
		if (this.editForm.get('firstName').value.toString().trim() === '') {
			this.errorsList.push('no value in field "First Name"');
		}

		if (this.errorsList.length > 0) {
			return false;
		}

		return true;
	}
	public submitForm(): void {
		let person: Person = {
			id: (this.data.action === 'modify') ? this.data.personId : null,
			lastName: this.editForm.get('lastName').value,
			firstName: this.editForm.get('firstName').value,
			socialNumber: this.editForm.get('socialNumber').value,
			telephone: this.editForm.get('telephone').value,
			birthDate: this.editForm.get('birthDate').value,
			city: this.editForm.get('city').value
		};

		if (this.checkForm()) {
			if (this.data.action === 'new') {
				this.personsService.save(person).subscribe(value => {
					this.router.navigate(['/']);
				}, error => {
					this.errorsList.push(error);
				});
			}
			else if (this.data.action === 'modify') {
				this.personsService.update(this.data.personId, person).subscribe(value => {
					this.router.navigate(['/']);
				}, error => {
					this.errorsList.push(error);
				});
			}
		}
	}
	public cancel(): void {
		this.router.navigate(['/']);
	}
}
