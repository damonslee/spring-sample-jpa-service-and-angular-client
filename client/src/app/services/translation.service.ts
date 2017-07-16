import { Injectable } from '@angular/core';

const translationData = {
	/* PersonsService */
	'Server error': {
		'English': 'Server error',
		'Polish': 'Błąd po stronie serwera'
	},
	/* UiTableNavigatorComponent */
	'Items on page': {
		'English': 'Items on page',
		'Polish': 'pozycji na stronie'
	},
	'From [From ... to ... of ...]': {
		'English': 'From',
		'Polish': 'Od'
	},
	'to [From ... to ... of ...]': {
		'English': 'to',
		'Polish': 'do'
	},
	'of [From ... to ... of ...]': {
		'English': 'of',
		'Polish': 'z'
	},
	/* HeaderComponent */
	'English': {
		'English': 'English',
		'Polish': 'angielski'
	},
	'Language': {
		'English': 'Language',
		'Polish': 'Język'
	},
	'Polish': {
		'English': 'Polish',
		'Polish': 'polski'
	},
	/* PersonsListComponent */
	'Persons list': {
		'English': 'Persons list',
		'Polish': 'Lista osób'
	},
	'Error message': {
		'English': 'Error message',
		'Polish': 'Informacje'
	},
	'Loading': {
		'English': 'Loading',
		'Polish': 'Ładowanie danych'
	},
	'Last name': {
		'English': 'Last name',
		'Polish': 'Nazwisko'
	},
	'First name': {
		'English': 'First name',
		'Polish': 'Imię'
	},
	'Social number': {
		'English': 'Social number',
		'Polish': 'PESEL'
	},
	'Telephone': {
		'English': 'Telephone',
		'Polish': 'Telefon'
	},
	'Birth date': {
		'English': 'Birth date',
		'Polish': 'Data urodzenia'
	},
	'City': {
		'English': 'City',
		'Polish': 'Miejscowość'
	},
	'New person': {
		'English': 'New person',
		'Polish': 'Nowa osoba'
	},
	'Edit person': {
		'English': 'Edit person',
		'Polish': 'Edycja osoby'
	},
	'Delete person': {
		'English': 'Delete person',
		'Polish': 'Usuń osobę'
	},
	/* PersonEditComponent */
	'Save': {
		'English': 'Save',
		'Polish': 'Zapisz'
	},
	'Cancel': {
		'English': 'Cancel',
		'Polish': 'Anuluj'
	},
	/* PersonDeleteComponent */
	'Delete': {
		'English': 'Delete',
		'Polish': 'Usuń'
	},
	'Are you sure you want to delete': {
		'English': 'Are you sure you want to delete',
		'Polish': 'Czy na pewno usunąć'
	}
};

@Injectable()
export class TranslationService {
	private currentLanguage: string;

	constructor() {
		this.currentLanguage = 'English';
	}
	public setCurentLanguage(language: string): void {
		this.currentLanguage = language;
	}
	public getCurrentLanguage(): string {
		return this.currentLanguage;
	}
	public translate(text: string): string {
		let entry = translationData[text];
		let res: string = '';

		if (entry) {
			res = entry[this.currentLanguage];
		}
		else {
			res = '???[' + text + ']???';
			console.log('There is no translation for: ' + text);
		}
		return res;
	}
}
