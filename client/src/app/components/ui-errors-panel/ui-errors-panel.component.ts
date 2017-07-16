import { Component, Input, OnInit } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'ui-errors-panel',
  templateUrl: './ui-errors-panel.component.html',
  styleUrls: ['./ui-errors-panel.component.css']
})
export class UiErrorsPanelComponent implements OnInit {
	@Input() public errorsList: Array<string>;

	constructor(public translationService: TranslationService) {
		this.errorsList = [];
	}
	ngOnInit() {
	}
}
