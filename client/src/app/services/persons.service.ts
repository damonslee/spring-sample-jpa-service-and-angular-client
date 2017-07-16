import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { Person } from '../types/person';
import { PageInfo } from '../types/page-info';

@Injectable()
export class PersonsService {

	constructor(private http: Http) {
	}
	public findAllPaging(pageInfo: PageInfo, search: Person): Observable<any> {
		return this.http.post(`${environment.server_url}/api/persons`, {
			pageInfo: pageInfo,
			search: search
		}, {
			headers: new Headers({
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			})
		}).catch((error: any) => {
			// return Observable.throw(error.json());
			return Observable.throw('Server error');
		}).map((response: Response) => {
			return response.json();
		});
	}
	public findById(id: number): Observable<any> {
		return this.http.get(`${environment.server_url}/api/person/${id}`, {
			headers: new Headers({
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			})
		}).catch((error: any) => {
			// return Observable.throw(error.json());
			return Observable.throw('Server error');
		}).map((response: Response) => {
			return response.json();
		});
	}
	public save(person: Person): Observable<any> {
		return this.http.post(`${environment.server_url}/api/person`, person, {
			headers: new Headers({
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			})
		}).catch((error: any) => {
			// return Observable.throw(error.json());
			return Observable.throw('Server error');
		}).map((response: Response) => {
			return response.json();
		});
	}
	public update(id: number, person: Person): Observable<any> {
		return this.http.put(`${environment.server_url}/api/person/${id}`, person, {
			headers: new Headers({
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			})
		}).catch((error: any) => {
			// return Observable.throw(error.json());
			return Observable.throw('Server error');
		}).map((response: Response) => {
			return response.json();
		});
	}
	public delete(id: number): Observable<any> {
		return this.http.delete(`${environment.server_url}/api/person/${id}`, {
			headers: new Headers({
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			})
		}).catch((error: any) => {
			// return Observable.throw(error.json());
			return Observable.throw('Server error');
		}).map((response: Response) => {
			return response.json();
		});
	}
}
