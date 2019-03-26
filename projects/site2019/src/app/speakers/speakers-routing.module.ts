import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeakersPageComponent } from './speakers-page/speakers-page.component';


const routes: Routes = [
    {
        path: ':id',
        component: SpeakersPageComponent,
        pathMatch: 'prefix'
    },
    {
        path: '',
        component: SpeakersPageComponent,
        pathMatch: 'prefix'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SpeakersRoutingModule { }
