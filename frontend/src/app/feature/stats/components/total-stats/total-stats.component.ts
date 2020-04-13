import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TotalStats } from '../../model/total-stats';
import { MatDialog } from '@angular/material/dialog';
import { PlotComponent } from '../plot/plot.component';
import { HistoricalStats } from '../../model/historical-stats';

@Component({
  selector: 'app-total-stats',
  templateUrl: './total-stats.component.html',
  styleUrls: ['./total-stats.component.scss']
})
export class TotalStatsComponent implements OnInit, OnDestroy {
  data: any[];
  subscriptions: Subscription[] = [];
  totalStats: TotalStats;

  @Input() totalStats$: Observable<TotalStats>;
  @Input() historicalStats$: Observable<HistoricalStats>;

  gradient = false;

  colorScheme = {
    domain: ['#a40000', '#4de44a', '#0c4aed']
  };

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.totalStats$.subscribe(stats => {
      this.totalStats = stats;
      this.data = Object.keys(stats).filter(k => k !== 'updated' && k !== 'cases')
        .map(key => {
          return {name: key, value: stats[key]};
        });
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onSelect(data): void {
    this.dialog.open(PlotComponent, {
      data: {
        initialCountry: null,
        initialPlot: data.name,
      }
    });

    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
