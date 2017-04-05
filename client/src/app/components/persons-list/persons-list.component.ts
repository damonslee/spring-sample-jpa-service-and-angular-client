import { Component, OnInit } from '@angular/core';

import { PersonsService } from '../../services/persons.service';

interface PageSizeItem {
	value: number;
	caption: string;
}

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {
	public messages: string[];
	public personsList: any[];
	public totalRowsCount: number;
	public pageSize: number;
	public pageNumber: number;
	public sortBy: string;
	public sortDirection: string;

	constructor(private personsService: PersonsService) {
		this.messages = [];
		this.personsList = [];
		this.sortBy = 'lastName';
		this.sortDirection = 'ASC';
		this.totalRowsCount = 0;
		this.pageSize = 25;
		this.pageNumber = 0;
	}
	ngOnInit() {
		this.getPersonsList();
	}
	private getPersonsList(): void {
		this.messages = [];
		this.personsService.findAllPaging(this.pageNumber, this.pageSize, this.sortBy, this.sortDirection).subscribe(value => {
			this.personsList = value.data;
			this.totalRowsCount = value.totalRows;
		}, error => {
			this.messages.push(error);
		});
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
}
