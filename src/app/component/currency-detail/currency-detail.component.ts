import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../../service/currency.service';
import {ActivatedRoute} from '@angular/router';
import {CurrencyDetail} from '../../class/currency-detail';
import {Location} from '@angular/common';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss']
})
export class CurrencyDetailComponent implements OnInit {

  currency: CurrencyDetail;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCurrecy();
  }

  getCurrecy(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.currencyService.getCurrency(id)
      .subscribe(currencyDetail => {
        this.currency = currencyDetail;
        this.isLoading = false;
      });
  }

  goBack(): void {
    this.location.back();
  }

}
