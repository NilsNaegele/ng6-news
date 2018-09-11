import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsItemComponent } from './components/news-list/news-item/news-item.component';
import { NewstickerComponent } from './components/newsticker/newsticker.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    NewsListComponent,
    NewsItemComponent,
    NewstickerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
