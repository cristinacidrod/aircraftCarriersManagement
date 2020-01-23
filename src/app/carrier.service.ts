import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Carrier } from './carrier';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class CarriersService {

  private carriersUrl = 'api/carriers';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET carriers from the server */
  getCarriers(): Observable<Carrier[]> {
    return this.http.get<Carrier[]>(this.carriersUrl)
      .pipe(
        tap(_ => this.log('fetched carriers')),
        catchError(this.handleError<Carrier[]>('getCarriers', []))
      );
  }

  /** GET carrier by id. Return `undefined` when id not found */
  getCarrierNo404<Data>(id: number): Observable<Carrier> {
    const url = `${this.carriersUrl}/?id=${id}`;
    return this.http.get<Carrier[]>(url)
      .pipe(
        map(carriers => carriers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} carrier id=${id}`);
        }),
        catchError(this.handleError<Carrier>(`getCarrier id=${id}`))
      );
  }

  /** GET carrier by id. Will 404 if id not found */
  getCarrier(id: number): Observable<Carrier> {
    const url = `${this.carriersUrl}/${id}`;
    return this.http.get<Carrier>(url).pipe(
      tap(_ => this.log(`fetched carrier id=${id}`)),
      catchError(this.handleError<Carrier>(`getCarrier id=${id}`))
    );
  }

  /* GET carrierrs whose name contains search term */
  searchCarriers(term: string): Observable<Carrier[]> {
    if (!term.trim()) {
      // if not search term, return empty carrier array.
      return of([]);
    }
    return this.http.get<Carrier[]>(`${this.carriersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found carriers matching "${term}"`)),
      catchError(this.handleError<Carrier[]>('searchCarriers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new carrier to the server */
  addCarrier(carrier: Carrier): Observable<Carrier> {
    return this.http.post<Carrier>(this.carriersUrl, carrier, this.httpOptions).pipe(
      tap((newCarrier: Carrier) => this.log(`added carrier w/ id=${newCarrier.id}`)),
      catchError(this.handleError<Carrier>('addCarrier'))
    );
  }

  /** DELETE: delete the carrier from the server */
  deleteCarrier(carrier: Carrier | number): Observable<Carrier> {
    const id = typeof carrier === 'number' ? carrier : carrier.id;
    const url = `${this.carriersUrl}/${id}`;

    return this.http.delete<Carrier>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted carrier id=${id}`)),
      catchError(this.handleError<Carrier>('deleteCarrier'))
    );
  }

  /** PUT: update the carrier on the server */
  updateCarrier(carrier: Carrier): Observable<any> {
    return this.http.put(this.carriersUrl, carrier, this.httpOptions).pipe(
      tap(_ => this.log(`updated carrier id=${carrier.id}`)),
      catchError(this.handleError<any>('updateCarrier'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CarriersService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CarriersService: ${message}`);
  }
}