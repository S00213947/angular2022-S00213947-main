import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/enviroments/enviroment';  // Adjust the path as necessary
import { Cocktail } from './cocktail';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = environment.apiUri; // Ensure this is defined in your environment files
  private favorites: string[] = [];

  constructor(private http: HttpClient) {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  addToFavorites(cocktail: Cocktail): Observable<any> {
const payload={
strDrink:cocktail?.strDrink ,
strInstructions:cocktail?.strInstructions ||'',
strIngredient1:cocktail?.strIngredient1 ||'',
strMeasure1:cocktail?.strMeasure1||'',
strIngredient2:cocktail?.strIngredient2||'',
strMeasure2:cocktail?.strMeasure2||'',
strIngredient3:cocktail?.strIngredient3||'',
strMeasure3:cocktail?.strMeasure3||'',
strIngredient4:cocktail?.strIngredient4||'',
strMeasure4:cocktail?.strMeasure4||'',
strIngredient5:cocktail?.strIngredient5||'',
strMeasure5:cocktail?.strMeasure5||'',
strIngredient6:cocktail?.strIngredient6 ||'',
strMeasure6:cocktail?.strMeasure6||'',
strIngredient7:cocktail?.strIngredient7 ||'',
strMeasure7:cocktail?.strMeasure7||'',
idDrink:cocktail?.idDrink,
strDrinkThumb:cocktail?.strDrinkThumb ||''

}
    return this.http.post(`${this.apiUrl}/cocktails/favorites`, payload);
}

removeFromFavorites(cocktailId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cocktails/favorites/${cocktailId}`);
}

  isFavorite(cocktailId: string): boolean {
    return this.favorites.includes(cocktailId);
  }

  getFavorites(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(`${this.apiUrl}/cocktails/favorites`);

  }
}