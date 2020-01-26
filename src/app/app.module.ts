import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Icons.
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBomb, faTheaterMasks, faRobot, faSpaceShuttle, faGhost, faSnowman, faFilm } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SingleMovieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Icons added to library for reuse.
  constructor(library: FaIconLibrary) {
    library.addIcons(faBomb, faTheaterMasks, faRobot, faSpaceShuttle, faGhost, faSnowman, faFilm );
  }
}
