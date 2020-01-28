import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { GLOBAL } from './globalConfiguration';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public url: string;
  private filterValueSource = new Subject<string>();
  private requestResultSource = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // Movie filter value communication service.
  filerValue$ = this.filterValueSource.asObservable();

  updateFilterValue(value: string) {
    this.filterValueSource.next(value);
  }

  // Movie request value communication service.
  requestResult$ = this.requestResultSource.asObservable();

  setRequestResult(value: boolean, callback: any) {
    this.requestResultSource.next(value);
    callback();
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

  public getMovieByID(id: string): Observable<HttpResponse<Movie>> {
    return this.http.get<Movie>(this.url + 'movies/' + id, { observe: 'response' }).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  public createMovie(newMovie: Movie): Observable<HttpResponse<Movie>> {
    return this.http.post<Movie>(this.url + 'movies', newMovie, { observe: 'response' }).pipe(
      catchError(this.handleError)
    )
  }
}