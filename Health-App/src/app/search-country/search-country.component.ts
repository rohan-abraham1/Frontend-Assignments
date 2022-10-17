import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { option } from '../model/model.search';

export interface User {
  name: string;
  Country?: string;
  ISO2?: string;
  Slug?: string;
}

@Component({
  selector: 'app-search-country',
  templateUrl: './search-country.component.html',
  styleUrls: ['./search-country.component.css'],
})
export class SearchCountryComponent implements OnInit {
  countryName: any;
  myControl = new FormControl<string | User>('');
  options: User[] = option;
  filteredOptions: Observable<User[]> | undefined;

  listOfCountries: User[] = [];

  constructor(private _country: CountryService, private _router: Router) {}

  ngOnInit(): void {
    this._country.getCountries().subscribe((listOfCountries) => {
      this.listOfCountries = listOfCountries;
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  clickCountry() {
    this.countryName = this.myControl.value;
    let name = this.countryName.name;
    this._router.navigate(['country', name]);
  }

  selectCountry(name?: string) {
    this._router.navigate(['country', name]);
  }
}
