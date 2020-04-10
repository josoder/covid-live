import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatsFacade } from './feature/stats/facade/stats-facade';
import { CountryStats } from './feature/stats/model/country-stats';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sideBarOpened = true;
  countryStats$: Observable<CountryStats[]>;

  constructor(private statsFacade: StatsFacade) {
  }

  toggleSideBar($event: any) {
    this.sideBarOpened = !this.sideBarOpened;
  }

  countrySelected($event: CountryStats) {
    this.statsFacade.setActiveCountryStats($event);
  }

  ngOnInit(): void {
    this.countryStats$ = this.statsFacade.getCountryStatsStream()
      .pipe(
        map(countries => {
          return countries.sort((statA, statB) => statB.cases - statA.cases);
        })
      );
  }
}
