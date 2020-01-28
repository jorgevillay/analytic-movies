import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription }   from 'rxjs';

import { Movie } from '../models/movie.model';
import { LoginService } from '../services/login.service';
import { MovieService } from '../services/movie.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css']
})
export class SingleMovieComponent implements OnInit, OnDestroy {
  public movieID: string;
  public selectedMovie: Movie;
  public loadingFinished: boolean;
  public proccessRunning: boolean;
  // Movie subscription variables.
  public movieRequestSubscription: Subscription;
  // Object to control request status and error message (if applies).
  public movieRequest: { error: boolean, message: string };

  constructor(private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private movieService: MovieService,
    private utilitiesService: UtilitiesService,
    private modalService: NgbModal) {
    this.movieRequest = { error: false, message: null };
    this.proccessRunning = false;
    this.loadingFinished = false;
    // Movie subscription control.
    this.movieRequestSubscription = movieService.requestResult$.subscribe(response => {
      if (response) {
        this.loadingFinished = false;
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    if (this.loginService.getLoginInformation()) {
      this.movieID = this.route.snapshot.paramMap.get('id');
      this.movieService.getMovieByID(this.movieID).subscribe(response => {
        this.selectedMovie = response.body;
        // Loading spinner control.
        this.loadingFinished = true;
      }, err => {
        this.movieRequest.error = true;
        this.movieRequest.message = err;
      });
    } else this.router.navigate(['/login']);
  }

  // Prevent memory leak when component is destroyed
  ngOnDestroy() {
    this.movieRequestSubscription.unsubscribe();
  }

  openModal(modalName: any, modalSize: string) {
    this.modalService.open(modalName, { size: modalSize });
  }

  deleteMovie() {
    this.proccessRunning = true;
    this.movieService.deleteMovie(this.movieID).subscribe(response => {
      this.proccessRunning = false;
      this.modalService.dismissAll();
      this.router.navigate(['/dashboard']);
    }, err => {
      this.proccessRunning = false;
      this.modalService.dismissAll();
      this.movieRequest.error = true;
      this.movieRequest.message = err;
    });
  }
}
