import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './index-page/app.component';
import { Top20Component } from './top20/top20.component';
import { AboutComponent } from './about/about.component';
import {FilmRoutingModule} from '../services/film-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TransformNameAsQueryParamPipe} from '../pipes/transform-name-as-query-param.pipe';
import {DisplayArrayAsStringPipe} from '../pipes/display-array-as-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    Top20Component,
    AboutComponent,
    DisplayArrayAsStringPipe,
    TransformNameAsQueryParamPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    FilmRoutingModule,
    NgbModule
  ],
  exports: [
    AppComponent,
    Top20Component,
    AboutComponent,
    DisplayArrayAsStringPipe,
    TransformNameAsQueryParamPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class PagesModule { }
