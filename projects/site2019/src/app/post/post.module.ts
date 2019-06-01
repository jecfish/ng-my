import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostPageComponent } from './post-page/post-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostRoutingModule
  ]
})
export class PostModule { }
