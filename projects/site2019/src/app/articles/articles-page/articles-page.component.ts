import { Component, OnInit } from '@angular/core';
import postList from '../../../assets/data/posts.json';

@Component({
  selector: 'my-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit {
  posts = [];

  constructor() {}

  ngOnInit() {
    this.posts = Object.keys(postList).reduce(
      (list, url) => [
        ...list,
        {
          url,
          ...postList[url]
        }
      ],
      []
    );

    console.log(this.posts);
  }
}
