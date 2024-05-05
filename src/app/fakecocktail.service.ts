import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cocktail } from './cocktail';

@Injectable({
  providedIn: 'root'
})
export class FakecocktailService {

  constructor() { }


 //private fakeCoctailData : Cocktail[] = [{"_id":"61643ac437689140c4239e5f",
 //  "drinkName":"A1","ing1":"Tequila", "measure1":"half"}]
 private fakeCoctailData : Cocktail[] = []

  getCocktails(): Observable<Cocktail[]>{
    console.log('Dummy cocktail called');

    return of(this.fakeCoctailData);
  }
}