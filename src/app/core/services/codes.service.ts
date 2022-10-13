import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryCode } from '../models/country_code.models';

@Injectable({
  providedIn: 'root'
})
export class CodesService {
  codesUrl: string = 'https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json';
  constructor(private http: HttpClient) { }

  getCodes() {
    return this.http.get<[CountryCode]>(this.codesUrl);
  }
}
