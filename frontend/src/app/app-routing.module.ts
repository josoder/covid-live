import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryStatsContainerComponent } from './feature/stats/containers/country-stats-container/country-stats-container.component';


const routes: Routes = [
  {path: '', redirectTo: 'stats', pathMatch: 'full'},
  {path: 'stats/:country', component: CountryStatsContainerComponent},
  {path: 'stats', component: CountryStatsContainerComponent},
  {path: 'news', loadChildren: () => import('./feature/news/news.module').then(m => m.NewsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
