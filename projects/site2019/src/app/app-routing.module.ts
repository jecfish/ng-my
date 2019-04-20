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
    // loadChildren: './coc/coc.module#CocModule'
    loadChildren: () => import('./coc/coc.module').then(m => m.CocModule)
  },
  {
    path: 'speakers',
    // loadChildren: './speakers/speakers.module#SpeakersModule'
    loadChildren: () =>
      import('./speakers/speakers.module').then(m => m.SpeakersModule)
  },
  {
    path: 'sessions',
    // loadChildren: './sessions/sessions.module#SessionsModule'
    loadChildren: () =>
      import('./sessions/sessions.module').then(m => m.SessionsModule)
  },
  {
    path: 'team',
    // loadChildren: './team/team.module#TeamModule'
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
  },
  {
    path: 'form',
    // loadChildren: './form/form.module#FormModule'
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'schedule',
    // loadChildren: './schedule/schedule.module#ScheduleModule'
    loadChildren: () =>
      import('./schedule/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: 'agenda',
    // loadChildren: './schedule/schedule.module#ScheduleModule'
    loadChildren: () =>
      import('./schedule/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./articles/articles.module').then(m => m.ArticlesModule)
  },
  {
    path: 'post',
    // loadChildren: './post/post.module#PostModule'
    loadChildren: () => import('./post/post.module').then(m => m.PostModule)
  },
  {
    path: 'home',
    // loadChildren: './home/home.module#HomeModule',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    // loadChildren: './home/home.module#HomeModule',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    pathMatch: 'prefix'
  }
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
export class AppRoutingModule {}
