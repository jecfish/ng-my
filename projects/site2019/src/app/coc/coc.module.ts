import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeOfConductPageComponent } from './code-of-conduct-page/code-of-conduct-page.component';
import { CocRoutingModule } from './coc-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CodeOfConductPageComponent
  ],
  imports: [
    CommonModule,
    CocRoutingModule,
    SharedModule
  ],

})
export class CocModule { }
