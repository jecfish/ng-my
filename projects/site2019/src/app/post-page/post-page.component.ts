import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../services/page.service';
import posts from '../../assets/data/posts.json';
import marked from 'marked';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  selectedPost: { title: '', desc: '', content: '' };

  constructor(private route: ActivatedRoute, private http: HttpClient,
    private pageSvc: PageService) { }

  ngOnInit() {
    this.route.params.subscribe(async x => {
      const post = posts[x.name] || {};
      this.pageSvc.setPage({
        title: post.title,
        metaDesc: post.desc,
      });

      const result = await this.http
        .get<any>(`/assets/posts/${x.name}.txt`, { responseType: 'text' as any }).toPromise();

      this.selectedPost = {
        title: post.title,
        desc: post.desc,
        content: marked.parse(result) as any
      };
    });
  }

}
