import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {Currencies} from '../class/currencies';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/internal/operators';
import {CurrencyDetail} from '../class/currency-detail';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private url = 'https://api.openfintech.io/v1/currencies';

  constructor(
    private  http: HttpClient
  ) {}

  getCurrencies(pageNumber: number): Observable<Currencies> {
    const pageSize = 100;
    return this.http.get<Currencies>(this.url, {
      params: {
        'page[size]': pageSize.toString(),
        'page[number]': pageNumber.toString()
      }
    });
  }

  getCurrency(id: string): Observable<CurrencyDetail> {
    const getCurrencyUrl = `${this.url}/${id}`;
    return this.http.get<CurrencyDetail>(getCurrencyUrl);
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
