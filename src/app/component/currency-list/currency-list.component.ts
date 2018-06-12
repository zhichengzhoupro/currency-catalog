import {Component, OnInit} from '@angular/core';
import {CurrencyService} from '../../service/currency.service';
import {Currencies, Currency} from '../../class/currencies';
import {forkJoin} from 'rxjs/index';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {


  currencies: Currency[] = [];
  currenciesPaged: Currency[] = [];
  pageSize = 10;
  pageSizeValues = [10, 50, 100];
  currentPage = 1;
  filterFieldsValues = ['id', 'code', 'name', 'type'];
  filterField = 'name';
  filterValue: string;
  fitlerResult: Currency[] = [];
  maxSize = 15;
  isLoading = true ;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.getFirst200Currencies();
    if (this.detectmob()) {
      this.maxSize = 3;
    }
  }

  getFirst200Currencies(): void {
    const query = [];
    let page = 1;
    while (page <= 2) {
      query.push(this.currencyService.getCurrencies(page));
      page++;
    }
    forkJoin(query).subscribe(results => {
      this.isLoading = false;
      for (const i in results) {
        this.currencies = this.currencies.concat(results[i].data);
      }
      this.fitlerResult = this.currencies;
      this.getCurrentPageElements();
    });
  }

  getCurrencies(pageNumber: number): void {
    this.currencyService.getCurrencies(pageNumber)
      .subscribe(currencies => {
        this.currencies = this.currencies.concat(currencies.data);
      });
  }

  changePage(event): void {
    this.getCurrentPageElements();
  }

  chosePageSize(pageSize): void {
    this.pageSize = pageSize;
    this.getCurrentPageElements();
  }

  getCurrentPageElements(): void {
    this.currenciesPaged = this.fitlerResult.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
  }

  choseFilterField(filterFieldsValue): void {
    this.filterField = filterFieldsValue;
    this.fitler();
  }

  choseFilterValue(value): void {
    this.filterValue = value;
    this.fitler();
  }

  fitler(): void {
    if (this.filterValue) {
      this.fitlerResult = this.currencies.filter(currency => {
        for (const x in currency) {
          if (x === this.filterField) {
            return currency[x] && currency[x].toUpperCase().startsWith(this.filterValue.toUpperCase());
          }
        }
        for (const x in currency.attributes) {
          if (x === this.filterField) {
            return currency[x] && currency[x].toUpperCase().startsWith(this.filterValue.toUpperCase());
          }
        }
        return false;
      });

    } else {
      this.fitlerResult = this.currencies;
    }
    this.getCurrentPageElements();
  }

  detectmob(): boolean {
    if ( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
