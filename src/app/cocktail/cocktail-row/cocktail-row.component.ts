import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/cocktail';

@Component({
  selector: 'app-cocktail-row',
  templateUrl: './cocktail-row.component.html',
  styleUrls: ['./cocktail-row.component.css']
})
export class CocktailRowComponent {
  @Input() cocktail!: Cocktail;
  constructor() { }

  ngOnInit(): void {
  }

}
