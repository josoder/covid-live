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
import { PlotComponent } from './components/plot/plot.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StatsContainerComponent,
    TotalStatsComponent,
    CountryStatsContainerComponent,
    PlotComponent
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
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class StatsModule {
}
