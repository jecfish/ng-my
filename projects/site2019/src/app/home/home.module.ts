import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeTicketPageComponent } from './home-ticket-page/home-ticket-page.component';

@NgModule({
  declarations: [
    HomeTicketPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
