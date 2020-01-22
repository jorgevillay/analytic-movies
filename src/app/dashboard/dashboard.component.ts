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
  public movieRequest: { error: boolean, message: string };

  constructor(private movieService: MovieService) {
    this.allMovies = [];
    this.movieRequest = { error: false, message: null };
  }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe(response => {
      this.allMovies = response.body;
    }, err => {
      this.movieRequest.error = true;
      this.movieRequest.message = err;
    });
  }

}
