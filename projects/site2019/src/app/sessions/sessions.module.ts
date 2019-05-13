import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionPageComponent } from './session-page/session-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SessionPageComponent,
  ],
  imports: [
    CommonModule,
    SessionsRoutingModule,
    SharedModule
  ]
})
export class SessionsModule { }
