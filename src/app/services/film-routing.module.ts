import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Top20Component} from '../pages/top20/top20.component';
import {AboutComponent} from '../pages/about/about.component';
import {GraphicsComponent} from '../pages/graphics/graphics.component';
import {FavoriteComponent} from '../pages/favorite/favorite.component';
import {Top20Guard} from '../guards/top20-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'top20', pathMatch: 'full'},
  { path: 'top20', component: Top20Component},
  { path: 'favorite', component: FavoriteComponent},
  { path: 'graphics', component: GraphicsComponent}, // , canActivate: [Top20Guard]},
  { path: 'about', component: AboutComponent},
  { path: '**', redirectTo: '/' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class FilmRoutingModule {}
