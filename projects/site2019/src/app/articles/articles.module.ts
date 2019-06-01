import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ArticlesPageComponent],
  imports: [CommonModule, SharedModule, ArticlesRoutingModule]
})
export class ArticlesModule {}
