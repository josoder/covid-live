import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatsTimeSeries } from '../../model/stats-time-series';
import { StatsFacade } from '../../facade/stats-facade';
import { pluck } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnInit {
  stats: StatsTimeSeries[] = [];
  view: any[] = [700, 300];
  plots: string[] = ['deaths', 'cases', 'recovered', 'active'];

  legend = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = false;
  showXAxisLabel = false;
  xAxisLabel = 'Date';
  yAxisLabel = 'Population';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  plotsControl: FormControl = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private statsFacade: StatsFacade) {
  }

  ngOnInit(): void {
    if (this.data && this.data.initialPlot) {
      this.plotsControl.valueChanges.subscribe(val => {
        const plots = val as string[];
        this.stats = this.stats.filter(s => plots.includes(s.name));
        plots.forEach(plot => {
          if (!this.stats.find(s => s.name === plot)) {
            this.addStats(null, plot);
          }
        });
      });

      this.plotsControl.setValue([this.data.initialPlot]);
    }
  }

  addStats(country: string, category: string) {
    return this.statsFacade.getHistoricalStats(this.data.initialCountry || null)
      .pipe(pluck(category))
      .subscribe(stats => {
        this.stats = [...this.stats, this.mapToStatsSeries(stats, category)];
      });
  }

  private mapToStatsSeries(stats: any, name: string): StatsTimeSeries {
    return new StatsTimeSeries(name, Object.entries(stats));
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
