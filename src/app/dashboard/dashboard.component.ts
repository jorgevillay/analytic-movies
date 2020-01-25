import { Component, OnInit } from '@angular/core';

import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public allMovies: Movie[];
  // Object to control request status and error message (if applies).
  public movieRequest: { error: boolean, message: string };

  constructor(private movieService: MovieService) {
    this.allMovies = [];
    this.movieRequest = { error: false, message: null };
  }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe(response => {
      response.body.forEach(movie => {
        // Validation for possible empty objects.
        if (movie.id) this.allMovies.push(movie);
      });
    }, err => {
      this.movieRequest.error = true;
      this.movieRequest.message = err;
    });
  }

}
