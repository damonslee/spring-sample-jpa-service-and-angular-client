import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';

import { Person } from '../../types/person';

import { TranslationService } from '../../services/translation.service';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {
	public errorsList: Array<string>;
	public personsList: Array<any>;
	private selectedPerson: any;
	public totalRowsCount: number;
	public pageSize: number;
	public pageNumber: number;
	public sortBy: string;
	public sortDirection: string;
	public personsListForm: any;
	public filter: Person;

	constructor(
		private router: Router,
		public translationService: TranslationService,
		private personsService: PersonsService
	) {
		this.personsListForm = new FormGroup({
			filterLastName: new FormControl(),
			filterFirstName: new FormControl(),
			filterSocialNumber: new FormControl(),
			filterTelephone: new FormControl(),
			filterBirthDate: new FormControl(),
			filterCity: new FormControl()
		});

		this.errorsList = [];
		this.personsList = [];
		this.selectedPerson = undefined;
		this.sortBy = 'lastName';
		this.sortDirection = 'ASC';
		this.totalRowsCount = 0;
		this.pageSize = 25;
		this.pageNumber = 0;
		this.filter = {
			id: null,
			lastName: '',
			firstName: '',
			socialNumber: '',
			telephone: '',
			birthDate: '',
			city: ''
		};
	}
	ngOnInit() {
		let debounce: number = 500;
		this.personsListForm.get('filterLastName').valueChanges.debounceTime(debounce).subscribe(value => {
			this.filter.lastName = value;
			this.getPersonsList();
		});
		this.personsListForm.get('filterFirstName').valueChanges.debounceTime(debounce).subscribe(value => {
			this.filter.firstName = value;
			this.getPersonsList();
		});
		this.personsListForm.get('filterSocialNumber').valueChanges.debounceTime(debounce).subscribe(value => {
			this.filter.socialNumber = value;
			this.getPersonsList();
		});
		this.personsListForm.get('filterTelephone').valueChanges.debounceTime(debounce).subscribe(value => {
			this.filter.telephone = value;
			this.getPersonsList();
		});
		this.personsListForm.get('filterBirthDate').valueChanges.debounceTime(debounce).subscribe(value => {
			this.filter.birthDate = value;
			this.getPersonsList();
		});
		this.personsListForm.get('filterCity').valueChanges.debounceTime(debounce).subscribe(value => {
			this.filter.city = value;
			this.getPersonsList();
		});

		this.getPersonsList();
	}
	private getPersonsList(): void {
		this.errorsList = [];
		this.personsService.findAllPaging({
			page: this.pageNumber,
			size: this.pageSize,
			sortBy: this.sortBy,
			direction: this.sortDirection
		}, {
			id: null,
			lastName: this.personsListForm.get('filterLastName').value,
			firstName: this.personsListForm.get('filterFirstName').value,
			socialNumber: this.personsListForm.get('filterSocialNumber').value,
			telephone: this.personsListForm.get('filterTelephone').value,
			birthDate: this.personsListForm.get('filterBirthDate').value,
			city: this.personsListForm.get('filterCity').value
		}).subscribe(value => {
			this.personsList = value.data;
			this.totalRowsCount = value.totalRows;
		}, error => {
			this.errorsList.push(error);
		});
	}
	public selectPersonClick(person: any): void {
		this.selectedPerson = person;
	}
	private handlePageSizeChanged(value: any): void {
		this.pageSize = value;
		this.pageNumber = 0;
		this.getPersonsList();
	}
	private handleCurrentPageChanged(value: any): void {
		this.pageNumber = value;
		this.getPersonsList();
	}
	public formatTelephone(telephone: string) {
		let res = '';

		if (telephone !== '') {
			res = '+' + telephone.substr(0, 2) + ' ' + telephone.substr(2, 3) + ' ' + telephone.substr(5, 2) + ' ' + telephone.substr(7, 2) + ' ' + telephone.substr(9, 2);
		}

		return res;
	}
	public setSortByColumn(columnName: string) {
		if (columnName === this.sortBy) {
			this.sortDirection = (this.sortDirection === 'ASC') ? 'DESC' : 'ASC';
		}
		else {
			this.sortBy = columnName;
			this.sortDirection = 'ASC';
		}
		this.getPersonsList();
	}
	public newPerson() {
		this.router.navigate(['/new-person']);
	}
	public editPerson() {
		this.router.navigate(['/modify-person', this.selectedPerson.id]);
	}
	public deletePerson() {
		this.router.navigate(['/delete-person', this.selectedPerson.id]);
	}
}
