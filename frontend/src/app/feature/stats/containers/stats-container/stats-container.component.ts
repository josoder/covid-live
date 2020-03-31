import { Component, OnDestroy, OnInit } from '@angular/core';
import { TotalStats } from '../../model/total-stats';
import { StatsFacade } from '../../facade/stats-facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats-container',
  templateUrl: './stats-container.component.html',
  styleUrls: ['./stats-container.component.scss']
})
export class StatsContainerComponent implements OnInit, OnDestroy {

  totalStats: TotalStats;
  subscriptions: Subscription[] = [];

  constructor(private statsFacade: StatsFacade) {
  }

  ngOnInit(): void {
    this.statsFacade.getCurrentTotal().subscribe(stats => {
      this.totalStats = stats;
    });

    this.subscriptions.push(this.statsFacade.getTotalStatsStream().subscribe(stats => {
      this.totalStats = stats;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
