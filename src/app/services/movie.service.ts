import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GLOBAL } from './globalConfiguration';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  public getAllMovies() {
    return this.http.get(this.url + 'movies')
  }
}