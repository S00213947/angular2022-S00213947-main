import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Observable, observable, of, pipe, Subject, throwError } from 'rxjs';
import {catchError,tap, map} from 'rxjs/operators';
import { DrinkReponse } from '../cocktail/cocktailresponse';
import { environment } from 'src/enviroments/enviroment';




@Injectable({
  providedIn: 'root'
})
export class CocktailApiService {

  readonly endpoint: string = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  readonly random: string = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  private apiUrl = environment.apiUri;
  
  constructor(private http: HttpClient) { }


  getrandomData(): Observable<DrinkReponse[]> {
    return this.http.get<DrinkReponse[]>(this.random).pipe(
        tap(data => console.log('Random data', JSON.stringify(data))),
        catchError(this.handleError),
        map((data: any) => data['drinks'])
      );
  }


  

getSearchData(searchTerm: string){
  const emptyResults: DrinkReponse[] = [];
  return this.http.get(this.endpoint  + searchTerm).pipe(
      tap(data => console.log('Searchdata/error' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
}

addToFavorites(userId: string, cocktail: any): Observable<any> {
  const body = { userId, cocktail };
  return this.http.post(`${this.apiUrl}/users`, body).pipe(
      tap(data => console.log('Added to favorites', JSON.stringify(data))),
      catchError(this.handleError)
    );
}
addFavorite(userId: string, cocktailId: string): Observable<any> {
  const url = `${this.apiUrl}/users/${userId}/profile`;
  return this.http.post(url, { cocktailId });
}


private handleError(err:HttpErrorResponse){
  console.log('ApiService: ' + err.message);
  return throwError("error: " + err.message);
}

}
