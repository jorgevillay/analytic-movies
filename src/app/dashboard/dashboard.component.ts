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

  constructor(private movieService: MovieService) {
    // this.allMovies = [];
  }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe(response => {
      this.allMovies = response;
    });
  }

}
