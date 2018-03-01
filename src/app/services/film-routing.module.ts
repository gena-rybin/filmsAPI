import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Top20Component} from '../pages/top20/top20.component';
import {AboutComponent} from '../pages/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'top20', pathMatch: 'full'},
  { path: 'top20', component: Top20Component},
  { path: 'about', component: AboutComponent},
  // { path: 'agent', component: AgentComponent,   canActivate: [AuthGuard, AgentGuard],
  //   children: [
  //     { path: 'about-us', component: AgentAboutUsPageComponent },
  //     { path: 'terms-conditions', component: AgentTermsPageComponent },
  //   ]
  // },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class FilmRoutingModule {}
