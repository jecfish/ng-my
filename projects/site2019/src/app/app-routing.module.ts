import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { environment } from '../environments/environment';
// import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';
// import { HomePageComponent } from './home-page/home-page.component';
// import { HomeEarlyPageComponent } from './home-early-page/home-early-page.component';

// stage: 0, 1, 2
// const HOMEPAGE_LIST = [
//   PlaceholderPageComponent,
//   HomeEarlyPageComponent,
//   HomeTicketPageComponent,
//   HomeTicketPageComponent
// ];

const routes: Routes = [
  {
    path: 'coc',
    loadChildren: './coc/coc.module#CocModule'
  },
  {
    path: 'speakers',
    loadChildren: './speakers/speakers.module#SpeakersModule'
  },
  {
    path: 'sessions',
    loadChildren: './sessions/sessions.module#SessionsModule'
  },
  {
    path: 'team',
    loadChildren: './team/team.module#TeamModule'
  },
  {
    path: 'form',
    loadChildren: './form/form.module#FormModule'
  },
  {
    path: 'schedule',
    loadChildren: './schedule/schedule.module#ScheduleModule'
  },
  {
    path: 'post',
    loadChildren: './post/post.module#PostModule'
  },
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
    pathMatch: 'prefix'
  },
  // {
  //   path: '',
  //   component: HOMEPAGE_LIST[environment.featureFlag.homePageStage],
  //   pathMatch: 'prefix'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
