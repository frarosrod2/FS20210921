import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() itemsPerPage: number = 25;
  @Input() itemsNumber: number = 100;
  @Input() allPagesNumber: number = 100;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  private _currentPage: number = 1;
  constructor() { }

  ngOnInit(): void {}

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page) {
    this._currentPage = page;
    this.changePage.emit(this.currentPage);
  }

  onSetPage(event: any): void {
    this.currentPage = event.target.value;
  }

  onFirstPage(): void {
    this.currentPage = 1;
  }

  onLastPage(): void {
    this.currentPage = this.allPagesNumber;
  }

  onNextPage(): void {
    this.currentPage += 1;
  }

  onPreviousPage(): void {
    this.currentPage -= 1;
  }
}

