import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FoodRoutingModule } from './food-routing.module';
import { FoodPageComponent } from './food-page/food-page.component';

@NgModule({
  declarations: [
    FoodPageComponent
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    SharedModule
  ],

})
export class FoodModule { }
