import { Component, OnDestroy, OnInit } from '@angular/core';
import { TotalStats } from '../../model/total-stats';
import { StatsFacade } from '../../facade/stats-facade';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-stats-container',
  templateUrl: './stats-container.component.html',
  styleUrls: ['./stats-container.component.scss']
})
export class StatsContainerComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  totalStream$: Observable<TotalStats>;

  constructor(private statsFacade: StatsFacade) {
  }

  ngOnInit(): void {
    this.totalStream$ = this.statsFacade.getCurrentTotalStream();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
