import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPageComponent } from './form-page/form-page.component';


const routes: Routes = [
    {
        path: ':name',
        component: FormPageComponent,
        pathMatch: 'prefix'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class FormRoutingModule { }
