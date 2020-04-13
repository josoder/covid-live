import { Component, OnDestroy, OnInit } from '@angular/core';
import { TotalStats } from '../../model/total-stats';
import { StatsFacade } from '../../facade/stats-facade';
import { Observable } from 'rxjs';
import { HistoricalStats } from '../../model/historical-stats';

@Component({
  selector: 'app-stats-container',
  templateUrl: './stats-container.component.html',
  styleUrls: ['./stats-container.component.scss']
})
export class StatsContainerComponent implements OnInit, OnDestroy {

  totalStream$: Observable<TotalStats>;
  historicalTotal$: Observable<HistoricalStats>;

  constructor(private statsFacade: StatsFacade) {
  }

  ngOnInit(): void {
    this.totalStream$ = this.statsFacade.getCurrentTotalStream();
    this.historicalTotal$ = this.statsFacade.getHistoricalStats();
  }

  ngOnDestroy(): void {
  }
}
