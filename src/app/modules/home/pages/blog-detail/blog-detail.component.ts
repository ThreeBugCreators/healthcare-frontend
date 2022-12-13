import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticleStaticData } from 'src/app/core/constants';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogId: any;
  article: any;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.findArticle();
  }

  findArticle() {
    const article = ArticleStaticData.find((element) => element.id === this.blogId);
    this.article = article;
  }

}
