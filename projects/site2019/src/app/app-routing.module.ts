import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'coc',
    loadChildren: () => import('./coc/coc.module').then(m => m.CocModule)
  },
  {
    path: 'speakers',
    loadChildren: () =>
      import('./speakers/speakers.module').then(m => m.SpeakersModule)
  },
  {
    path: 'sessions',
    loadChildren: () =>
      import('./sessions/sessions.module').then(m => m.SessionsModule)
  },
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'schedule',
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
    loadChildren: () => import('./post/post.module').then(m => m.PostModule)
  },
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then(m => m.FoodModule)
  },
  {
    path: 'home',
    redirectTo: '/'
  },
  {
    path: '',
    loadChildren: () =>
      import('./home-post-event/home-post-event.module').then(
        m => m.HomePostEventModule
      ),
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
