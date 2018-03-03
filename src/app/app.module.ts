import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {PagesModule} from './pages/pages.module';
import {FilmRoutingModule} from './services/film-routing.module';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './pages/index-page/app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FilmBackendService} from './services/film-backend.service';
import {FilmJsonpService} from './services/film-jsonp.service';
import { ModalVideoComponent } from './components/modal-video/modal-video.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, HttpClientJsonpModule,
    NgbModule,
    NgbModule.forRoot(),
    PagesModule,
    FilmRoutingModule
  ],
  exports: [NgbModule],
  providers: [FilmBackendService, FilmJsonpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
