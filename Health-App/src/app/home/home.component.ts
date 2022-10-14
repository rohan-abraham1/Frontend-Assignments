import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  globalSummaryData: IGlobal = {
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0,
  };

  constructor(private _summary: CountryService) {}

  ngOnInit(): void {
    this._summary
      .getSummary()
      .subscribe(
        (summaryData) => (this.globalSummaryData = summaryData.Global)
      );
  }
}

interface IGlobal {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}
