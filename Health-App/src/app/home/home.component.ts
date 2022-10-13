import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  pageTitle!: string;
  flagCountry = 0;
  flagFilter = 0;
  countryName = '';
  filteredConfirmed = 0;
  filteredDeaths = 0;
  filteredRecovered = 0;

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

  filteredCountry: ICountryFiltered = {
    ID: '',
    Country: '',
    CountryCode: '',
    Province: '',
    City: '',
    CityCode: '',
    Lat: '',
    Lon: '',
    Confirmed: 0,
    Deaths: 0,
    Recovered: 0,
    Active: 0,
    Date: '',
  };

  filteredCountries: ICountryFiltered[] = [];

  constructor(
    private _summary: CountryService,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.countryName = <any>params.get('countryName');
      if (this.countryName) {
        this.flagCountry = 1;
        this.pageTitle = this.countryName;
        this._summary.getSummary().subscribe((summaryData) => {
          this.countriesSummaryData = summaryData.Countries;
          this.filterCountry(this.countryName);
        });
      } else {
        this.flagCountry = 0;
        this.pageTitle = 'The World';
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

  filterWithDate() {
    this.flagFilter = 1;
    let startDate = String(
      this.datepipe.transform(this.range.value.start, 'yyyy-MM-dd')
    );
    let endDate = String(
      this.datepipe.transform(this.range.value.end, 'yyyy-MM-dd')
    );
    console.log(startDate);
    console.log(endDate);
    this._summary
      .getFilteredDate(
        this.countryName.toLowerCase().replace(' ', '-').replace(',', '-'),
        startDate,
        endDate
      )
      .subscribe((filteredDatas) => {
        this.filteredCountries = filteredDatas;
        console.log(this.filteredCountries);
        this.filteredConfirmed =
          this.filteredCountries[this.filteredCountries.length - 1].Confirmed -
          this.filteredCountries[0].Confirmed;
        this.filteredDeaths =
          this.filteredCountries[this.filteredCountries.length - 1].Deaths -
          this.filteredCountries[0].Deaths;
        this.filteredRecovered =
          this.filteredCountries[this.filteredCountries.length - 1].Recovered -
          this.filteredCountries[0].Recovered;
        console.log(this.filteredConfirmed);
        console.log(this.filteredDeaths);
        console.log(this.filteredRecovered);
      });
    // this.flagFilter = 0;
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

interface ICountryFiltered {
  ID: string;
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
}
