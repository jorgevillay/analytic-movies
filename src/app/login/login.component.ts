import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Login } from '../models/login.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public proccessRunning: boolean;
  // Login form variables.
  public loginForm: FormGroup;
  // Object to control request status and error message (if applies).
  public loginRequest: { error: boolean, message: string };

  constructor(private router: Router,
    private loginService: LoginService) {
    this.proccessRunning = false;
    this.loginRequest = { error: false, message: null };
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmitForm() {
    this.proccessRunning = true;
    var loginInformation = new Login(this.loginForm.value.username, this.loginForm.value.password);
    this.loginService.validateLogin(loginInformation).subscribe(response => {
      this.proccessRunning = false;
      if (response.body.token) {
        this.loginRequest = { error: false, message: null };
        localStorage.setItem('loginInformation', JSON.stringify({ username: loginInformation.username, token: response.body.token }));
        this.loginService.setLoginResult(response.body.token, () => {
          this.router.navigate(['/dashboard']);
        });
      }
      else {
        this.loginRequest.error = true;
        this.loginRequest.message = response.body.error;
      }
    }, err => {
      this.proccessRunning = false;
      this.loginRequest.error = true;
      this.loginRequest.message = err;
    });
  }
}
