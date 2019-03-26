import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakersPageComponent } from './speakers-page/speakers-page.component';
import { SpeakersRoutingModule } from './speakers-routing.module';

@NgModule({
  declarations: [
    SpeakersPageComponent
  ],
  imports: [
    CommonModule,
    SpeakersRoutingModule
  ]
})
export class SpeakersModule { }
