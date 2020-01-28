import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { GLOBAL } from './globalConfiguration';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url: string;
  private loginResultSource = new Subject<string>();

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // Login request value communication service.
  loginResult$ = this.loginResultSource.asObservable();

  setLoginResult(value: string, callback: any) {
    this.loginResultSource.next(value);
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

  public validateLogin(loginInformation: Login): Observable<HttpResponse<{ token: string, error: string }>> {
    return this.http.post<{ token: string, error: string }>(this.url + 'user/login', loginInformation, { observe: 'response' }).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  public getLoginInformation() {
  	return JSON.parse(localStorage.getItem('loginInformation'));
  }

  public resetLoginInformation() {
  	localStorage.removeItem('loginInformation');
  }
}
