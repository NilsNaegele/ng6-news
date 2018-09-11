import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsApiURL = 'https://newsapi.org/v2/';
  private headers = new HttpHeaders({'X-Api-Key': environment.apiKey});
  private paramLanguage = new HttpParams().set('language', 'en');

  categoryChangeListener = new EventEmitter();
  titleChangeListener = new EventEmitter();

  constructor(private http: HttpClient) { }

  getTopHeadlines(category: string, country: string, page: number): Observable<News> {
    const fragment = 'top-headlines';
    const params = this.paramLanguage.append('category', category)
                                     .append('country', country)
                                     .append('page', page.toString())
                                     .append('pageSize', '7');
    return this.http.get<News>(this.newsApiURL + fragment,
                              { headers: this.headers, params: params});
  }

  getCategorizedNews(): Observable<News> {
    const fragment = 'everything';
    return this.http.get<News>(this.newsApiURL + fragment,
                              { headers: this.headers, params: this.paramLanguage});
  }

  changeCategory(category: string) {
    this.categoryChangeListener.emit({ category: category });
  }

  broadcastTitles(data: any) {
    this.titleChangeListener.emit(data.articles);
  }


}
