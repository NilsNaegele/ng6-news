import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  categoryList = [['Global', 'General'], ['Geschäft', 'Business'], ['Unterhaltung', 'Entertainment'],
                  ['Gesundheit', 'Health'], ['Naturwissenschaften', 'Science'],
                  ['Sport', 'Sports'], ['Technologie', 'Technology']];

  constructor(private newsService: NewsService) { }

  changeCategory(category: string): void {
    this.newsService.changeCategory(category);
  }

}
