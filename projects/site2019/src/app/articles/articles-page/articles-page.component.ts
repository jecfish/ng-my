import { Component, OnInit } from '@angular/core';
import postList from '../../../assets/data/posts.json';
import { PageService } from '../../services/page.service.js';

@Component({
  selector: 'my-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit {
  posts = [];

  constructor(private pageSvc: PageService) { }

  ngOnInit() {
    this.pageSvc.setPage({
      title: 'posts',
      metaDesc: 'all articles of NG-MY',
    });

    this.posts = Object.keys(postList).map(url => ({
      url,
      ...postList[url]
    }));
  }
}
