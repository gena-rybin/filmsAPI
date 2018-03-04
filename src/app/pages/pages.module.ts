import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './index-page/app.component';
import { Top20Component } from './top20/top20.component';
import { AboutComponent } from './about/about.component';
import {FilmRoutingModule} from '../services/film-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TransformNameAsQueryParamPipe} from '../pipes/transform-name-as-query-param.pipe';
import {ComponentsModule} from '../components/components.module';
import { GraphicsComponent } from './graphics/graphics.component';
import { FavoriteComponent } from './favorite/favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    Top20Component,
    AboutComponent,
    TransformNameAsQueryParamPipe,
    GraphicsComponent,
    FavoriteComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    FilmRoutingModule,
    NgbModule,
    ComponentsModule
  ],
  exports: [
    AppComponent,
    Top20Component,
    AboutComponent,
    TransformNameAsQueryParamPipe,
    GraphicsComponent,
    FavoriteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class PagesModule { }
