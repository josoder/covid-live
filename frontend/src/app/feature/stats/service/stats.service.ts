import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotalStats } from '../model/total-stats';
import { environment } from '../../../../environments/environment';
import { CountryStats } from '../model/country-stats';
import { HistoricalStats } from '../model/historical-stats';


@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) {
  }

  getCurrentTotal(): Observable<TotalStats> {
    return this.http.get<TotalStats>(environment.api.root);
  }

  getCurrentTotalCountries(): Observable<CountryStats[]> {
    return this.http.get<CountryStats[]>(environment.api.root + 'countries');
  }

  getHistorical(country?: string): Observable<HistoricalStats> {
    let url = environment.api.root + environment.api.historical;

    if (country) {
      url += country;
    }

    return this.http.get<HistoricalStats>(url);
  }
}
