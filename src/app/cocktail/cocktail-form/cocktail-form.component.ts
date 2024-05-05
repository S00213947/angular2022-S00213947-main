import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cocktail } from 'src/app/cocktail';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-cocktail-form',
  templateUrl: './cocktail-form.component.html',
  styleUrls: ['./cocktail-form.component.css']
})
export class CocktailFormComponent implements OnInit {

  @Input() cocktail?: Cocktail;
  @Output() cocktailFormClose = new EventEmitter<Cocktail>();
  cocktailForm : FormGroup = new FormGroup({});
 

  constructor() { }

  ngOnInit(): void {
    
    console.table(this.cocktail)
    this.cocktailForm  = new FormGroup({
      strDrink: new FormControl (this.cocktail?.strDrink, [Validators.required, Validators.minLength(2)]),
      strIngredient1: new FormControl (this.cocktail?.strIngredient1, [Validators.required]),
      strMeasure1: new FormControl(this.cocktail?.strMeasure1,[Validators.required]),
      
      })
     
    }


onSubmit(){
  console.log('forms submitted with: ');
  console.table(this.cocktailForm?.value);
  this.cocktailFormClose.emit(this.cocktailForm?.value);
}



closeForm() {
  this.cocktailFormClose.emit(undefined)

}


get title() {
  return this.cocktailForm?.get('drinkName');
}
get year_written() {
  return this.cocktailForm?.get('strIngredient1');
}


}
