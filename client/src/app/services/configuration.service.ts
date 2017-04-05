import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
	private serverUrl: string;

	constructor() {
		this.serverUrl = 'http://localhost:8080/';
	}
	public getServerUrl(): string {
		let serverUrl = this.serverUrl;
		if (this.serverUrl.substr(this.serverUrl.length - 1, 1) === '/') {
			serverUrl = this.serverUrl.substr(0, this.serverUrl.length - 1);
		}
		return serverUrl;
	}
}
