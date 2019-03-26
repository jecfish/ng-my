import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeTicketPageComponent } from './home-ticket-page/home-ticket-page.component';


const routes: Routes = [
    {
        path: '',
        component: HomeTicketPageComponent,
        pathMatch: 'prefix'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
