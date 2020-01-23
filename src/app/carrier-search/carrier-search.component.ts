import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Carrier } from '../carrier';
import { CarriersService } from '../carrier.service';

@Component({
  selector: 'app-carrier-search',
  templateUrl: './carrier-search.component.html',
  styleUrls: ['./carrier-search.component.css']
})
export class CarrierSearchComponent implements OnInit {
  carriers$: Observable<Carrier[]>;
  private searchTerms = new Subject<string>();

  constructor(private carriersService: CarriersService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.carriers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.carriersService.searchCarriers(term)),
    );
  }
}