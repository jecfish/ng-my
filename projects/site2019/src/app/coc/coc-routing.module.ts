import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeOfConductPageComponent } from './code-of-conduct-page/code-of-conduct-page.component';


const routes: Routes = [
  {
    path: '',
    component: CodeOfConductPageComponent,
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CocRoutingModule { }
