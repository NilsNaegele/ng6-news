import { Component, OnInit } from '@angular/core';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  eventList = new Array<string>();
  clockStr: string;

  data: any;

  constructor(private newsService: NewsService) {
    setInterval(() => this.getTime(), 1000);
  }

  ngOnInit() {
    this.newsService.titleChangeListener.subscribe((data) => {
      this.data = data;
      for (let i = 0; i < this.data.length; i++) {
        this.eventList.push(this.data[i].title);
      }
  });
}

  getTime() {
    const date = new Date();

    this.clockStr = [date.getHours(), date.getMinutes(), date.getSeconds()]
      .map(current => current >= 10 ? current : '0' + current)
      .join(':');
  }

}
