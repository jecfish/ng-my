import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SchedulePageComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule
  ]
})
export class ScheduleModule { }
