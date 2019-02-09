import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { PageService } from '../services/page.service';
import forms from '../../assets/data/forms.json';

@Component({
  selector: 'my-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {

  selectedForm: any;

  private urlPattern = 'https://docs.google.com/forms/d/e/{id}/viewform?embedded=true';

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private pageSvc: PageService) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      const form = forms[x.name] || {};
      if (!form.id) return;

      this.pageSvc.setPage({
        title: form.name,
        metaDesc: form.desc,
      });

      form.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlPattern.replace('{id}', form.id));
      this.selectedForm = form;
    });
  }

}
