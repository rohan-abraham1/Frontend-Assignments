import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pageTitle!: string;
  flagCountry = 0;
  flagComponent = 0;

  globalSummaryData: IGlobal = {
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0,
  };

  countrySummaryData: ICountry = {
    Country: '',
    CountryCode: '',
    Slug: '',
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0,
    Date: new Date(),
  };

  countriesSummaryData: ICountry[] = [];

  constructor(
    private _summary: CountryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const countryName = params.get('countryName');
      if (countryName) {
        this.flagCountry = 1;
        this.flagComponent = 1;
        this.pageTitle = 'Cases in ' + countryName + ' today';
        this._summary.getSummary().subscribe((summaryData) => {
          this.countriesSummaryData = summaryData.Countries;
          this.filterCountry(countryName);
        });
      } else {
        this.flagCountry = 0;
        this.flagComponent = 0;
        this.pageTitle = 'Global Cases To-date';
        this._summary
          .getSummary()
          .subscribe(
            (summaryData) => (this.globalSummaryData = summaryData.Global)
          );
      }
    });
  }

  filterCountry(countryName: string) {
    this.countrySummaryData = this.countriesSummaryData.filter(
      (country) => country.Country == countryName
    )[0];
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

interface ICountry {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
}
