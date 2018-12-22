import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';
import { environment } from '../environments/environment';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: environment.featureFlag.isPlaceholder ? PlaceholderPageComponent : HomePageComponent,
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
