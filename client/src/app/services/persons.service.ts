import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConfigurationService } from './configuration.service';

@Injectable()
export class PersonsService {
	constructor(
		private http: Http,
		private configurationService: ConfigurationService
	) {
	}
	public findAllPaging(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Observable<any> {
		return this.http.post(this.configurationService.getServerUrl() + '/api/findall-paging', {
			pageNumber: pageNumber,
			pageSize: pageSize,
			sortBy: sortBy,
			sortDirection: sortDirection
		}, {
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).map(response => response.json());
	}
}
