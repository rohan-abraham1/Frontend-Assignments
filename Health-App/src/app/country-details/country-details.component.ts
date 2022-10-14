import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  countryName = '';

  countrySummaryData: ICountry = {
    Country: '',
    CountryCode: '',
    Slug: '',
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewActive: 0,
    TotalRecovered: 0,
    Date: new Date(),
  };

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
        this._summary
          .getCountrySummary(this.countryName)
          .subscribe((summaryData) => {
            this.countrySummaryData.NewConfirmed =
              summaryData[summaryData.length - 1].Confirmed -
              summaryData[summaryData.length - 2].Confirmed;
            this.countrySummaryData.NewDeaths =
              summaryData[summaryData.length - 1].Deaths -
              summaryData[summaryData.length - 2].Deaths;
            this.countrySummaryData.NewActive =
              summaryData[summaryData.length - 1].Active -
              summaryData[summaryData.length - 2].Active;
            console.log(this.countrySummaryData.NewConfirmed);
            console.log(this.countrySummaryData.NewDeaths);
            console.log(this.countrySummaryData.NewActive);
          });
      }
    });
  }

  filterWithDate() {
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
        this.countrySummaryData.NewConfirmed =
          this.filteredCountries[this.filteredCountries.length - 1].Confirmed -
          this.filteredCountries[0].Confirmed;
        this.countrySummaryData.NewDeaths =
          this.filteredCountries[this.filteredCountries.length - 1].Deaths -
          this.filteredCountries[0].Deaths;
        this.countrySummaryData.TotalRecovered =
          this.filteredCountries[this.filteredCountries.length - 1].Recovered -
          this.filteredCountries[0].Recovered;
        console.log(this.countrySummaryData.NewConfirmed);
        console.log(this.countrySummaryData.NewDeaths);
        console.log(this.countrySummaryData.TotalRecovered);
      });
  }
}

interface ICountry {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewActive: number;
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
