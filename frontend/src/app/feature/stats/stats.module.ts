import { NgModule } from '@angular/core';

import { StatsRoutingModule } from './stats-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StatsContainerComponent } from './containers/stats-container/stats-container.component';
import { MatDividerModule } from '@angular/material/divider';
import { TotalStatsComponent } from './components/total-stats/total-stats.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    StatsContainerComponent,
    TotalStatsComponent
  ],
  imports: [
    SharedModule,
    StatsRoutingModule,
    MatDividerModule,
    NgxChartsModule,
    HttpClientModule
  ]
})
export class StatsModule {
}
