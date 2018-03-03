import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FilmRoutingModule} from '../services/film-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalVideoComponent} from './modal-video/modal-video.component';
import {SafeVideoPipe} from '../pipes/safe-video.pipe';

@NgModule({
  declarations: [
    ModalVideoComponent,
    SafeVideoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    FilmRoutingModule,
    NgbModule
  ],
  exports: [
    ModalVideoComponent,
    SafeVideoPipe
  ],
  providers: [],
  bootstrap: []
})
export class ComponentsModule { }
