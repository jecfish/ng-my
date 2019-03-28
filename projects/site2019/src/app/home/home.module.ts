import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeTicketPageComponent } from './home-ticket-page/home-ticket-page.component';
import { DeferLoadModule } from '@trademe/ng-defer-load';

@NgModule({
  declarations: [
    HomeTicketPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DeferLoadModule
  ]
})
export class HomeModule { }
