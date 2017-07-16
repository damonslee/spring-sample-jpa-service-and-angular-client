import { Component } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

@Component({
	selector: 'header-component',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	constructor(public translationService: TranslationService) {
	}
	public changeLanguage(language: string): void {
		if (this.translationService.getCurrentLanguage() !== language) {
			this.translationService.setCurentLanguage(language);
		}
	}
}
