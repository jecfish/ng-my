import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePostEventRoutingModule } from './home-post-event-routing.module';
import { PostEventComponent } from './post-event/post-event.component';

@NgModule({
  declarations: [PostEventComponent],
  imports: [CommonModule, HomePostEventRoutingModule]
})
export class HomePostEventModule {}
