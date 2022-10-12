import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  baseURL = 'https://api.covid19api.com';

  getCountries(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/countries`);
  }

  getSummary(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/summary`);
  }
}
