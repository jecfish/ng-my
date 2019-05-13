import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakersPageComponent } from './speakers-page/speakers-page.component';
import { SpeakersRoutingModule } from './speakers-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SpeakersPageComponent,
  ],
  imports: [
    CommonModule,
    SpeakersRoutingModule,
    SharedModule
  ]
})
export class SpeakersModule { }
