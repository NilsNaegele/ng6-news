import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  newsList: News;
  pageIndex = 1;
  category = '';

  constructor(private newsService: NewsService,
              private spinner: NgxSpinnerService) {
                newsService.categoryChangeListener.subscribe((data) => {
                    this.pageIndex = 1;
                    this.category = data.category;
                    this.getNews(this.category, 1);
                });
              }

  ngOnInit() {
    this.getNews(this.category, 1);
  }

  getNews(category: string, page: number): void {
      this.spinner.show();
      this.newsService.getTopHeadlines(category, 'de', this.pageIndex).subscribe(
        (newsList: News) => {
          this.newsList = newsList;
          this.getTitles(newsList);
          this.spinner.hide();
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
        }
      );
  }

  getTitles(data: any): void {
    this.newsService.broadcastTitles(data);
  }

}
