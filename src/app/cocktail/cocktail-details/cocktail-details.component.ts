import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/cocktail';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.css']
})
export class CocktailDetailsComponent {
@Input() cocktail!: Cocktail;

constructor() { }

ngOnInit(): void {
}

}

