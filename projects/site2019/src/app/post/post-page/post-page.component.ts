import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';
import posts from '../../../assets/data/posts.json';
import marked from 'marked';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'my-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostPageComponent implements OnInit {

  selectedPost: { title: '', desc: '', content: '' };

  constructor(private route: ActivatedRoute, private pageSvc: PageService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.params.subscribe(async x => {
      const post = posts[x.name] || {};

      this.pageSvc.setPage({
        title: post.title,
        metaDesc: post.desc,
        metaImg: `${environment.baseUrl}/assets/imgs/posts/${post.img}.jpg`
      });

      const result = await fetch(`/assets/posts/${x.name}.txt`).then(res => res.text());

      this.selectedPost = {
        title: post.title,
        desc: post.desc,
        content: marked.parse(result) as any
      };

      this.ref.detectChanges();
    });
  }

}
