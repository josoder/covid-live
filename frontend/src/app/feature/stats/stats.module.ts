import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { StatsContainerComponent } from './containers/stats-container/stats-container.component';
import { MatDividerModule } from '@angular/material/divider';
import { TotalStatsComponent } from './components/total-stats/total-stats.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { CountryStatsContainerComponent } from './containers/country-stats-container/country-stats-container.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    StatsContainerComponent,
    TotalStatsComponent,
    CountryStatsContainerComponent
  ],
  exports: [
    StatsContainerComponent
  ],
  imports: [
    SharedModule,
    MatDividerModule,
    NgxChartsModule,
    HttpClientModule,
    AppRoutingModule,
    MatGridListModule
  ]
})
export class StatsModule {
}
