import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { GLOBAL } from './globalConfiguration';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // Error control to display message.
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Server error:', error.error.message);
    } else {
      console.error(`Backend error code: ${error.status}. Body content: ${error.error}`);
    }
    return throwError(`Server error: ${error.message}. Please try again later.`);
  };

  public getAllMovies(): Observable<HttpResponse<Movie[]>> {
    return this.http.get<Movie[]>(this.url + 'movies', { observe: 'response' }).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}