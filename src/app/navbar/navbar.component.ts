import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MovieService]
})
export class NavbarComponent implements OnInit {
  public filterValue: string;

  constructor(private movieService: MovieService,
    private modalService: NgbModal) {
    this.filterValue = '';
  }

  ngOnInit() {
  }

  updateFilterValue(value: string) {
    this.movieService.updateFilterValue(value);
  }

  openModal(modalName: any) {
    this.modalService.open(modalName, { size: 'lg' });
  }
}
