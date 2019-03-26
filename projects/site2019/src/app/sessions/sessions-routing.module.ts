import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionPageComponent } from './session-page/session-page.component';


const routes: Routes = [
    {
        path: ':id',
        component: SessionPageComponent,
        pathMatch: 'prefix'
    },
    {
        path: '',
        component: SessionPageComponent,
        pathMatch: 'prefix'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SessionsRoutingModule { }
