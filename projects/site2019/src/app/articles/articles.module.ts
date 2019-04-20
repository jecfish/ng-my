import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { ArticlesRoutingModule } from './articles-routing.module';

@NgModule({
  declarations: [ArticlesPageComponent],
  imports: [CommonModule, ArticlesRoutingModule]
})
export class ArticlesModule {}
