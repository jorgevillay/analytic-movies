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
  public loadingFinished: boolean;
  // Object to control request status and error message (if applies).
  public movieRequest: { error: boolean, message: string };
  // Pagination variables.
  public pageMovies: Movie[];
  public itemsPerPage: number;
  public page: number;
  public previousPage: number;

  constructor(private movieService: MovieService) {
    this.allMovies = [];
    this.loadingFinished = false;
    this.movieRequest = { error: false, message: null };
    this.itemsPerPage = 8;
    this.page = 1;
  }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe(response => {
      response.body.forEach(movie => {
        // Validation for possible empty objects.
        if (movie.id) this.allMovies.push(movie);
      });
      this.loadPageMovies(this.page);
      // Loading spinner control.
      this.loadingFinished = true;
    }, err => {
      this.movieRequest.error = true;
      this.movieRequest.message = err;
    });
  }

  // Pagination control.
  loadPageMovies(currentPage: number) {
    // Movies subarray definition.
    var minIndex = ((currentPage - 1) * this.itemsPerPage);
    var maxIndex = (currentPage * this.itemsPerPage) - 1;
    this.pageMovies = this.allMovies.filter((movie, index) => { return index >= minIndex && index <= maxIndex });
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadPageMovies(page);
    }
  }
}
