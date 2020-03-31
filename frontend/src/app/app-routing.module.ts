import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'stats', pathMatch: 'full'},
  {path: 'stats', loadChildren: () => import('./feature/stats/stats.module').then(m => m.StatsModule)},
  {path: 'news', loadChildren: () => import('./feature/news/news.module').then(m => m.NewsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
