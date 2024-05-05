import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Cocktail } from '../cocktail';
import { FavoritesService } from '../favorites.service';
import { CocktailService } from '../cocktail.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Cocktail[] = [];

  constructor(private favoritesService: FavoritesService, private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.refreshFavorites();
  }

  
addFavorite(cocktail: Cocktail): void {
  this.favoritesService.addToFavorites(cocktail).subscribe({
      next: (response) => {
          console.log('Favorite added!', response);
          // Optionally refresh the local list if needed
      },
      error: (error) => console.error('Error adding favorite:', error)
  });
}

removeFavorite(cocktailId: string): void {
  this.favoritesService.removeFromFavorites(cocktailId).subscribe({
      next: (status) => {
          console.log('Favorite removed!',status);

          this.favorites.splice(this.favorites.findIndex((cocktail)=>cocktail.idDrink === cocktailId ),1)
        this.favorites = [... this.favorites]
          // Optionally refresh the local list if needed
      },
      error: (error) => console.error('Error removing favorite:', error)
  });
}

refreshFavorites(): void {
  this.favoritesService.getFavorites().subscribe({
      next: (favorites) => {
          this.favorites = favorites; // Assign the fetched favorites to the local array
          console.log('Favorites refreshed successfully!');
      },
      error: (error) => console.error('Failed to refresh favorites', error)
  });
}

}
