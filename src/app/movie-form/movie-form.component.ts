import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  public proccessRunning: boolean;
  public genresList: string[];
  // Movie form variables.
  public movieForm: FormGroup;
  // Object to control request status and error message (if applies).
  public movieRequest: { error: boolean, message: string };
  // Modal configuration.
  @Input() movie: string;
  @Input() operation: string;

  constructor(private modalService: NgbModal,
    private movieService: MovieService) {
    this.proccessRunning = false;
    this.movieRequest = { error: false, message: null };
    this.genresList = ['Acción', 'Drama', 'Suspenso', 'Animación', 'Ciencia ficción', 'Terror', 'Infatil'];
    const urlValidation = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.movieForm = new FormGroup({
      name: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required),
      cover: new FormControl('', [Validators.required, Validators.pattern(urlValidation)])
    });
  }

  ngOnInit() {
    if (this.movie) {
      this.movieService.getMovieByID(this.movie).subscribe(response => {
        this.movieForm.setValue({
          name: response.body.name,
          genre: response.body.genre,
          score: response.body.score,
          cover: response.body.cover
        });
      }, err => {
        this.movieRequest.error = true;
        this.movieRequest.message = err;
      });
    }
  }

  get formValidations() { return this.movieForm.controls }

  onSubmitForm() {
    this.proccessRunning = true;
    if (this.movie) {
      var newMovie = new Movie(this.movie, this.movieForm.value.name, this.movieForm.value.genre, this.movieForm.value.score, this.movieForm.value.cover);
      this.movieService.updateMovie(newMovie).subscribe(response => {
        this.proccessRunning = false;
        this.movieService.setRequestResult(true, () => {
          this.onResetForm();
        });
      }, err => {
        this.proccessRunning = false;
        this.movieRequest.error = true;
        this.movieRequest.message = err;
      });
    }
    else {
      var newMovie = new Movie(Math.random().toString(36).substring(7), this.movieForm.value.name, this.movieForm.value.genre, this.movieForm.value.score, this.movieForm.value.cover);
      this.movieService.createMovie(newMovie).subscribe(response => {
        this.proccessRunning = false;
        this.movieService.setRequestResult(true, () => {
          this.onResetForm();
        });
      }, err => {
        this.proccessRunning = false;
        this.movieRequest.error = true;
        this.movieRequest.message = err;
      });
    }
  }

  onResetForm() {
    this.movieForm.reset();
    this.modalService.dismissAll();
  }
}
