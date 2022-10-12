import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-search-country',
  templateUrl: './search-country.component.html',
  styleUrls: ['./search-country.component.css'],
})
export class SearchCountryComponent implements OnInit {
  listOfCountries: ICountries[] = [];

  constructor(private _country: CountryService) {}

  ngOnInit(): void {
    this._country
      .getCountries()
      .subscribe((listOfCountries) => (this.listOfCountries = listOfCountries));
  }

  clickCountry(countryName: string) {}
}

interface ICountries {
  Country: string;
  slug: string;
  ISO2: string;
}
