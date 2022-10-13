import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-country',
  templateUrl: './search-country.component.html',
  styleUrls: ['./search-country.component.css'],
})
export class SearchCountryComponent implements OnInit {
  listOfCountries: ICountries[] = [];

  constructor(private _country: CountryService, private _router: Router) {}

  ngOnInit(): void {
    this._country
      .getCountries()
      .subscribe((listOfCountries) => (this.listOfCountries = listOfCountries));
  }

  clickCountry(countryName: string) {
    this._router.navigate(['country', countryName]);
  }
}

interface ICountries {
  Country: string;
  slug: string;
  ISO2: string;
}
