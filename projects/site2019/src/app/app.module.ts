import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CodeOfConductPageComponent } from './code-of-conduct-page/code-of-conduct-page.component';
@NgModule({
  declarations: [
    AppComponent,
    PlaceholderPageComponent,
    CodeOfConductPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
