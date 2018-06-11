import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../../service/currency.service';
import {ActivatedRoute} from '@angular/router';
import {CurrencyDetail} from '../../class/currency-detail';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss']
})
export class CurrencyDetailComponent implements OnInit {

  currency: CurrencyDetail;


  constructor(
    private route: ActivatedRoute,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.getCurrecy();
  }

  getCurrecy(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.currencyService.getCurrency(id)
      .subscribe(currencyDetail => this.currency = currencyDetail);
  }

}
