import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { PageService } from '../services/page.service';

@Component({
  selector: 'my-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {

  selectedForm: any;

  private urlPattern = 'https://docs.google.com/forms/d/e/{id}/viewform?embedded=true';

  private forms = {
    'call-for-presenters': {
      name: 'Call for Presenters',
      id: '1FAIpQLSfUA8FNtmXeaR8l5yjMoeuzomow9nzBT_1K56IiL0EhOS1dig',
      height: 1908
    },
    'speaker-nomination': {
      name: 'Speaker Nomination',
      id: '1FAIpQLSdHx3NHJdYZrLqLFwjWjf7jGE8dfIJH4IYtMCvcqKVPxoJSWg',
      height: 2850
    },
    'call-for-sponsors': {
      name: 'Call for Sponsors',
      id: '1FAIpQLSdr6wRM-NPfFTdijSoozApxI5ypHJyBDnyCPdIiHkKs9DD9iw',
      height: 1633
    },
    'sponsor-connect': {
      name: 'Sponsor Connect',
      id: '1FAIpQLSfIxnhrW2p9E9RVBDelGiN8cp6pT3rIGxRyovmSiY5BxuuIKA',
      height: 1273
    }
  };

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private pageSvc: PageService, private meta: Meta) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      const form = this.forms[x.name] || {};

      if (!form.id) return;

      this.pageSvc.setPage({
        title: form.name,
        path: `/form/${x.name}`
      });

      this.meta.updateTag({ property: 'og:title', content: form.name + this.pageSvc.postfix });
      this.meta.updateTag({ property: 'og:url', content: window.location.href });

      form.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlPattern.replace('{id}', form.id));
      this.selectedForm = form;
    });
  }

}
