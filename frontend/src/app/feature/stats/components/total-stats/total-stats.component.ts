import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TotalStats } from '../../model/total-stats';

@Component({
  selector: 'app-total-stats',
  templateUrl: './total-stats.component.html',
  styleUrls: ['./total-stats.component.scss']
})
export class TotalStatsComponent implements OnInit, OnDestroy {
  exampleData: any[];
  subscriptions: Subscription[] = [];
  totalStats: TotalStats;

  @Input() totalStats$: Observable<TotalStats>;

  // options
  gradient = false;

  colorScheme = {
    domain: ['#a40000', '#4de44a', '#0c4aed']
  };

  constructor() {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.totalStats$.subscribe(stats => {
      this.totalStats = stats;
      this.exampleData = Object.keys(stats).filter(k => k !== 'updated' && k !== 'cases')
        .map(key => {
        return {name: key, value: stats[key]};
      });
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


}
