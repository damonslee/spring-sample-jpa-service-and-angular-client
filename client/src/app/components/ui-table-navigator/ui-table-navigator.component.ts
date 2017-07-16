import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

interface PageSizeItem {
	value: number;
	caption: string;
}
interface PageItem {
	offset: number;
	pageNo: number;
	caption: string;
}

@Component({
  selector: 'ui-table-navigator',
  templateUrl: './ui-table-navigator.component.html',
  styleUrls: ['./ui-table-navigator.component.css']
})
export class UiTableNavigatorComponent implements OnInit, OnChanges {
	@Input() public totalRowsCount: number;
	@Input() public pageSize: number;
	@Input() public currentPage: number;
	@Output() public pageSizeChanged: EventEmitter<any>;
	@Output() public currentPageChanged: EventEmitter<any>;
	public pageSizeStr: string;
	public lastPage: number;
	private dataOffset: number;
	public pageSizeItems: PageSizeItem[];
	public pagesItems: PageItem[];

	constructor(public translationService: TranslationService) {
		this.pageSizeChanged = new EventEmitter();
		this.currentPageChanged = new EventEmitter();

		this.pageSizeItems = [
			{ value: 10, caption: '10' },
			{ value: 25, caption: '25' },
			{ value: 50, caption: '50' },
			{ value: 100, caption: '100' }
		];
		this.pagesItems = [];
		this.totalRowsCount = 0;
		this.currentPage = 0;
		this.lastPage = 0;
		this.dataOffset = 0;
		this.pageSize = this.pageSizeItems[0].value;
		this.pageSizeStr = String(this.pageSize);
	 }

	ngOnInit() {
	}
	ngOnChanges() {
		this.pageSizeStr = String(this.pageSize);
		this.lastPage = (Number(this.pageSize) === 0) ? 0 : Math.ceil(this.totalRowsCount / this.pageSize);
		this.calculatePagesItems();
	}

	private calculatePagesItems(): void {
		let maxElementsCount: number;
		let halfElementsCount: number;
		let firstPage: number;
		let i: number;

		// maksymalna liczba elementów w nawigatorze
		maxElementsCount = 10;
		halfElementsCount = Math.ceil(maxElementsCount / 2);

		this.pagesItems = [];
		// strony na lewo od oktualnej strony
		for (i = this.currentPage - halfElementsCount; i < this.currentPage; i += 1) {
			if (i >= 0) {
				this.pagesItems.push({
					offset: i * this.pageSize,
					pageNo: i,
					caption: String(i + 1)
				});
			}
		}
		// aktualna strona
		i = this.currentPage;
		this.pagesItems.push({
			offset: i * this.pageSize,
			pageNo: i,
			caption: String(i + 1)
		});
		// strony na prawo od aktualnej strony (jeżeli jest taka możliwość
		// to dopełnienie do 10-ciu elementów)
		for (i = this.currentPage + 1; i < this.currentPage + maxElementsCount; i += 1) {
			if ((i < this.lastPage) && (this.pagesItems.length < maxElementsCount)) {
				this.pagesItems.push({
					offset: i * this.pageSize,
					pageNo: i,
					caption: String(i + 1)
				});
			}
		}

		// jeżeli jesteśmy pod koniec dostępnych paczek to może się zdarzyć,
		//  że nie udalo się dopełnić do 10 z prawej strony więc staramy się
		// dopełnić z lewej
		if (this.pagesItems.length < maxElementsCount) {
			firstPage = this.pagesItems[0].pageNo;
			if (firstPage > 0) {
				for (i = firstPage - 1; i > firstPage - maxElementsCount; i -= 1) {
					if ((i >= 0) && (this.pagesItems.length < maxElementsCount)) {
						this.pagesItems.unshift({
							offset: i * this.pageSize,
							pageNo: i,
							caption: String(i + 1)
						});
					}
				}
			}
		}
	}

	public pageSizeChange(): void {
		this.dataOffset = 0;
		this.currentPage = 0;
		this.pageSize = Number(this.pageSizeStr);

		this.pageSizeChanged.emit(this.pageSize);

		this.lastPage = (Number(this.pageSize) === 0) ? 0 : Math.ceil(this.totalRowsCount / this.pageSize);
		this.calculatePagesItems();
//		this.getItemsList();
	}
	public getPrevPage(): void {
		if ((this.dataOffset - this.pageSize) >= 0) {
			this.dataOffset -= Number(this.pageSize);
			this.currentPage -= 1;

			this.currentPageChanged.emit(this.currentPage);

			this.calculatePagesItems();
//			this.getItemsList();
		}
	}
	public getNextPage(): void {
		if ((this.dataOffset + this.pageSize) < this.totalRowsCount) {
			this.dataOffset += Number(this.pageSize);
			this.currentPage += 1;

			this.currentPageChanged.emit(this.currentPage);

			this.calculatePagesItems();
//			this.getItemsList();
		}
	}
	public getPageData(pageItem: any): void {
		this.dataOffset = pageItem.offset;
		this.currentPage = pageItem.pageNo;

		this.currentPageChanged.emit(this.currentPage);

		this.calculatePagesItems();
//		this.getItemsList();
	}
}
