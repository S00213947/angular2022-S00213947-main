import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Cocktail } from './cocktail';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private dataUri = `${environment.apiUri}/cocktails`;
  constructor(private http: HttpClient) { }

  getCocktails(): Observable<Cocktail[]> {

    console.log("get cocktails called" );

    return this.http.get<{drinks: any[]}>(`${this.dataUri}`).pipe(
      map(response => response?.drinks?.map(drink => this.transformToCocktail(drink)))
    );
  }

  private transformToCocktail(drink: any): Cocktail {
    return {
      idDrink: drink.idDrink,
      strDrink: drink.strDrink,
      strIngredient1: drink.strIngredient1,
      strIngredient2: drink.strIngredient2,
      strIngredient3: drink.strIngredient3,
      strIngredient4: drink.strIngredient4,
      strIngredient5: drink.strIngredient5,
      strIngredient6: drink.strIngredient6,
      strIngredient7: drink.strIngredient7,
      strMeasure1: drink.strMeasure1,
      strMeasure2: drink.strMeasure2,
      strMeasure3: drink.strMeasure3,
      strMeasure4: drink.strMeasure4,
      strMeasure5: drink.strMeasure5,
      strMeasure6: drink.strMeasure6,
      strMeasure7: drink.strMeasure7,
      strInstructions: drink.strInstructions
    };
  }

  addToFavorites(cocktail: any) {
   // return this.http.post(this.dataUri + '/favorites', cocktail).subscribe(
      return this.http.post(this.dataUri + '/users', cocktail).subscribe(
      response => console.log('Cocktail favorited:', response),
      error => console.error('Error favoriting cocktail:', error)
    );
  }


  getCocktailById(cocktailId: string): Observable<Cocktail> {
    if (!cocktailId) {
      console.error('Cocktail ID is undefined');
      return throwError(() => new Error('Cocktail ID is undefined'));
    }
    return this.http.get<Cocktail>(`${this.dataUri}/${cocktailId}`);
  }

  addCocktail(cocktail: Cocktail): Observable<Cocktail> {
    return this.http.post<Cocktail>(this.dataUri, cocktail)
      .pipe(
        catchError(this.handleError)
      )
  }

  /** DELETE: delete the cocktail from the server */
deleteCocktail(id: string): Observable<unknown> {
  const url = `${this.dataUri}/${id}`; // DELETE 
  return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    );
}

  updateCocktail(id: string, cocktail: Cocktail): Observable<Cocktail> {
    console.log('subscribing to update' + id);
    let cocktailURI: string = this.dataUri + '/' + id;
    return this.http.put<Cocktail>(cocktailURI, cocktail)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}