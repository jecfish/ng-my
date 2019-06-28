import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodPageComponent } from './food-page/food-page.component';


const routes: Routes = [
  {
    path: '',
    component: FoodPageComponent,
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
