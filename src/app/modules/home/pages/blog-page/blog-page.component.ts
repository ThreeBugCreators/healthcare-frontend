import { Component, OnInit } from '@angular/core';
import { ArticleStaticData } from 'src/app/core/constants';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  articles: any = ArticleStaticData;

  constructor() { }

  ngOnInit(): void {
  }

  handleNews(link: string) {
    if (link) {
      window.open(link, '_blank')?.focus();
    }
  }

}
