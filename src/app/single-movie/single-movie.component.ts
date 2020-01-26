import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css']
})
export class SingleMovieComponent implements OnInit {
  public movieId: string;
  public selectedMovie: Movie;
  public loadingFinished: boolean;
  // Object to control request status and error message (if applies).
  public movieRequest: { error: boolean, message: string };

  constructor(private route: ActivatedRoute,
    private movieService: MovieService,
    private utilitiesService: UtilitiesService) {
    this.movieRequest = { error: false, message: null };
    this.loadingFinished = false;
  }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieByID(this.movieId).subscribe(response => {
      this.selectedMovie = response.body;
      // Loading spinner control.
      this.loadingFinished = true;
    }, err => {
      this.movieRequest.error = true;
      this.movieRequest.message = err;
    });
  }
}
