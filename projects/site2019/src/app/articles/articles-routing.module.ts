import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesPageComponent } from './articles-page/articles-page.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesPageComponent,
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {}
