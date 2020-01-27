import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs';

import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public allMovies: Movie[];
  public loadingFinished: boolean;
  // Movie search variables.
  public movieSubscription: Subscription;
  // Genre filtering variables.
  public genresList: { value: string, selected: boolean }[];
  public genreMovies: Movie[];
  // Object to control request status and error message (if applies).
  public movieRequest: { error: boolean, message: string };
  // Pagination variables.
  public pageMovies: Movie[];
  public itemsPerPage: number;
  public page: number;
  public previousPage: number;

  constructor(private movieService: MovieService,
    private utilitiesService: UtilitiesService) {
    this.allMovies = [];
    // Genres list to filter.
    this.genresList = [{ value: 'All', selected: true }];
    this.loadingFinished = false;
    this.movieRequest = { error: false, message: null };
    this.itemsPerPage = 8;
    this.page = 1;
    this.movieSubscription = movieService.filerValue$.subscribe(response => {
      this.loadFilteredMovies(response);
    });
  }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe(response => {
      response.body.forEach(movie => {
        // Validation for possible empty objects.
        if (movie.id) {
          this.allMovies.push(movie);
          if (!this.genresList.find(genre => { return genre.value == movie.genre })) this.genresList.push({ value: movie.genre, selected: false });
        }
      });
      this.genreMovies = this.allMovies;
      this.loadPageMovies(this.page);
      // Loading spinner control.
      this.loadingFinished = true;
    }, err => {
      this.movieRequest.error = true;
      this.movieRequest.message = err;
    });
  }

  // Prevent memory leak when component is destroyed
  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }

  loadFilteredMovies(filterValue: string) {
    if (filterValue.length == 0) this.genreMovies = this.allMovies;
    else this.genreMovies = this.allMovies.filter(movie => { return movie.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()) });
    this.loadPageMovies(1);
  }

  loadGenreMovies(genre: { value: string, selected: boolean }) {
    // Genre subarray definition.
    this.genresList.forEach(genre => {
      genre.selected = false;
    });
    if (genre.value == 'All') this.genreMovies = this.allMovies;
    else this.genreMovies = this.allMovies.filter(movie => { return movie.genre == genre.value });
    genre.selected = true;
    this.loadPageMovies(1);
  }

  // Pagination control.
  loadPageMovies( currentPage: number) {
    // Movies subarray definition.
    let minIndex = ((currentPage - 1) * this.itemsPerPage);
    let maxIndex = (currentPage * this.itemsPerPage) - 1;
    this.pageMovies = this.genreMovies.filter((movie, index) => { return index >= minIndex && index <= maxIndex });
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadPageMovies(page);
    }
  }
}
