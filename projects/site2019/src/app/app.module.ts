import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CodeOfConductPageComponent } from './code-of-conduct-page/code-of-conduct-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SpeakersPageComponent } from './speakers-page/speakers-page.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { LogoPageComponent } from './logo-page/logo-page.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { HomeEarlyPageComponent } from './home-early-page/home-early-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { NotificationComponent } from './notification/notification.component';
import { PostPageComponent } from './post-page/post-page.component';
import { HomeTicketPageComponent } from './home-ticket-page/home-ticket-page.component';
@NgModule({
  declarations: [
    AppComponent,
    PlaceholderPageComponent,
    CodeOfConductPageComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    SpeakersPageComponent,
    TeamPageComponent,
    LogoPageComponent,
    SchedulePageComponent,
    HomeEarlyPageComponent,
    FormPageComponent,
    NotificationComponent,
    PostPageComponent,
    HomeTicketPageComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
