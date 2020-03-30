import { NgModule } from '@angular/core';

import { StatsRoutingModule } from './stats-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StatsContainerComponent } from './containers/stats-container/stats-container.component';


@NgModule({
  declarations: [
    StatsContainerComponent
  ],
  imports: [
    SharedModule,
    StatsRoutingModule
  ]
})
export class StatsModule {
}
