import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';


const routes: Routes = [
    {
        path: '',
        component: SchedulePageComponent,
        pathMatch: 'prefix'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ScheduleRoutingModule { }
