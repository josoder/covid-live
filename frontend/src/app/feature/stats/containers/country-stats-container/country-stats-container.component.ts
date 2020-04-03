import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryStats } from '../../model/country-stats';
import { StatsFacade } from '../../facade/stats-facade';

@Component({
  selector: 'app-country-stats-container',
  templateUrl: './country-stats-container.component.html',
  styleUrls: ['./country-stats-container.component.scss']
})
export class CountryStatsContainerComponent implements OnInit {
  activeCountry$: Observable<CountryStats>;

  constructor(private statsFacade: StatsFacade) {
  }

  ngOnInit(): void {
    this.activeCountry$ = this.statsFacade.getActiveCountryStats();
  }
}
