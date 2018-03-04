import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FilmRoutingModule} from '../services/film-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalVideoComponent} from './modal-video/modal-video.component';
import {SafeVideoPipe} from '../pipes/safe-video.pipe';
import { MovieTableComponent } from './movie-table/movie-table.component';
import {DisplayArrayAsStringPipe} from '../pipes/display-array-as-string.pipe';

@NgModule({
  declarations: [
    ModalVideoComponent,
    SafeVideoPipe,
    DisplayArrayAsStringPipe,
    MovieTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FilmRoutingModule,
    NgbModule
  ],
  exports: [
    ModalVideoComponent,
    SafeVideoPipe,
    MovieTableComponent,
    DisplayArrayAsStringPipe
  ],
  providers: [],
  bootstrap: []
})
export class ComponentsModule { }
