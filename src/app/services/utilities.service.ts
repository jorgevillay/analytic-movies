import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  // Icon assignment according to genre.
  public getGenreIcon(genre: string) {
    switch (genre) {
      case 'Acción':
        return 'bomb'
        break;
      case 'Drama':
        return 'theater-masks'
        break;
      case 'Suspenso':
          return 'user-secret'
          break;
      case 'Animación':
        return 'robot'
        break;
      case 'Ciencia ficción':
        return 'space-shuttle'
        break;
      case 'Terror':
        return 'ghost'
        break;
      case 'Infatil':
        return 'snowman'
        break;
      default:
        return 'film'
        break;
    }
  }
}