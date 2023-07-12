import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  valorInput: string;
  result1: number[] = [];
  result2: number[] = [];
  result3: number[] = [];
  multiplos3: number[] = [];
  multiplos5: number[] = [];
  multiplos7: number[] = [];

  constructor(private quoteService: QuoteService) {
    this.valorInput = '';
  }

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }

  calcular() {
    //this.valorInput = '';
    console.log(this.valorInput);
    parseInt(this.valorInput, 10);
    for (let i = 1; i <= +this.valorInput; i++) {
      if (i % 3 === 0) {
        this.multiplos3.push(i);
      }
      if (i % 5 === 0) {
        this.multiplos5.push(i);
      }
      if (i % 7 === 0) {
        this.multiplos7.push(i);
      }
    }

    if (+this.valorInput % 3 == 0) {
      this.result1 = this.multiplos3;
    }
    if (+this.valorInput % 7 == 0) {
      this.result2 = this.multiplos7;
    }
    if (+this.valorInput % 5 == 0) {
      this.result3 = this.multiplos5;
    }
  }
  limpiar() {
    this.multiplos3 = [];
    this.multiplos5 = [];
    this.multiplos7 = [];
    this.valorInput = '';
    this.result1 = [];
    this.result2 = [];
    this.result3 = [];
  }
}
