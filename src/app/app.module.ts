import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Icons.
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser, faKey, faBomb, faTheaterMasks, faUserSecret, faRobot, faSpaceShuttle, faGhost, faSnowman, faFilm } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    SingleMovieComponent,
    MovieFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [NavbarComponent]
})
export class AppModule {
  // Icons added to library for reuse.
  constructor(library: FaIconLibrary) {
    library.addIcons(faUser, faKey, faBomb, faTheaterMasks, faUserSecret, faRobot, faSpaceShuttle, faGhost, faSnowman, faFilm );
  }
}
