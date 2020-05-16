import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryStatsContainerComponent } from './feature/stats/containers/country-stats-container/country-stats-container.component';


const routes: Routes = [
  {path: '', redirectTo: 'stats', pathMatch: 'full'},
  {path: 'stats/:country', component: CountryStatsContainerComponent},
  {path: 'stats', component: CountryStatsContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
