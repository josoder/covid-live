import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { TotalStats } from '../model/total-stats';
import { StatsService } from '../service/stats.service';
import { SSEService } from '../../../core/services/sse/sse.service';
import { environment } from '../../../../environments/environment';
import { map, scan } from 'rxjs/operators';
import { CountryStats } from '../model/country-stats';
import { HistoricalStats } from '../model/historical-stats';

@Injectable({
  providedIn: 'root'
})
export class StatsFacade {
  constructor(private statsService: StatsService,
              private sseService: SSEService) {
  }

  private behaviourSubject: BehaviorSubject<CountryStats> = new BehaviorSubject<CountryStats>(null);

  getCurrentTotalStream(): Observable<TotalStats> {
    return merge(this.statsService.getCurrentTotal(), this.getTotalStatsStream());
  }

  getTotalStatsStream(): Observable<TotalStats> {
    return this.sseService.getSSEStream(environment.api.root + 'watch/total')
      .pipe(
        map(event => JSON.parse(event.data) as TotalStats),
      );
  }

  getCountryStatsStream(): Observable<CountryStats[]> {
    return this.sseService.getSSEStream(environment.api.root + 'watch/countries')
      .pipe(
        map(event => JSON.parse(event.data) as CountryStats),
        scan(this.updateCountryStats, [])
      );
  }

  private updateCountryStats(acc: CountryStats[], current: CountryStats): CountryStats[] {
    const existent = acc.find(x => x.country === current.country);
    if (existent) {
      acc[acc.indexOf(current)] = current;
    } else {
      acc.push(current);
    }
    return acc;
  }

  getHistoricalStats(country?: string): Observable<HistoricalStats> {
    return this.statsService.getHistorical(country);
  }

  getCountriesStats(): Observable<CountryStats[]> {
    return this.statsService.getCurrentTotalCountries();
  }

  getActiveCountryStats(): Observable<CountryStats> {
    return this.behaviourSubject.asObservable();
  }

  setActiveCountryStats(countryStats: CountryStats) {
    this.behaviourSubject.next(countryStats);
  }
}
