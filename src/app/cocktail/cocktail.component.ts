import { Component } from '@angular/core';
import { Cocktail } from '../cocktail';
import { FakecocktailService } from '../fakecocktail.service';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent {
  
  cocktails: Cocktail[] = [];
  message: String = '';

constructor(private cocktailService : FakecocktailService) { }
 //constructor(private cocktailService : CocktailService) { }

 ngOnInit(): void {
  this.cocktailService.getCocktails().subscribe({
    next: (value: Cocktail[]) => this.cocktails = value,
    complete: () => console.log('cocktail service finished'),
    error: (message) => this.message = message

  }) 

}


}