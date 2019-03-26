import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostPageComponent } from './post-page/post-page.component';


const routes: Routes = [
    {
        path: ':name',
        component: PostPageComponent,
        pathMatch: 'prefix'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PostRoutingModule { }
