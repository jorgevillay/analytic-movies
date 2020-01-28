import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription }   from 'rxjs';

import { LoginService } from '../services/login.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MovieService]
})
export class NavbarComponent implements OnInit, OnDestroy {
  public filterValue: string;
  // Login subscription variables.
  public loginResultSubscription: Subscription;
  public showLoginOptions: boolean;
  public loginInformation: { username: string, token: string };

  constructor(private router: Router,
    private loginService: LoginService,
    private movieService: MovieService,
    private modalService: NgbModal) {
    this.filterValue = '';
    this.showLoginOptions = false;
    this.loginResultSubscription = this.loginService.loginResult$.subscribe(response => {
      if (response) this.ngOnInit();
    });
  }

  ngOnInit() {
    this.loginInformation = this.loginService.getLoginInformation();
    if (this.loginInformation) this.showLoginOptions = true;
  }

  // Prevent memory leak when component is destroyed
  ngOnDestroy() {
    this.loginResultSubscription.unsubscribe();
  }

  updateFilterValue(value: string) {
    this.movieService.updateFilterValue(value);
  }

  openModal(modalName: any) {
    this.modalService.open(modalName, { size: 'lg' });
  }

  logout() {
    this.showLoginOptions = false;
    this.loginService.resetLoginInformation();
    this.router.navigate(['/login']);
  }
}
