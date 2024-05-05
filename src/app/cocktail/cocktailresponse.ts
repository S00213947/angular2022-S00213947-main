export interface DrinkReponse{
    // name: string,
    // imgThumb: string,
     //id: string
     drinks: drinkinfo;
     error: string;
 }
 
 interface drinkinfo{
     idDrink: string;
     strDrink: string;
     strDrinkThumb: string;
     strIngredient1: string;
     strIngredient2: string;
     strIngredient3: string;
     strIngredient4: string;
     strIngredient5: string;
     strIngredient6: string;
     strIngredient7: string;
     strIngredient8: string;
     strMeasure1: string;
     strMeasure2: string;
     strMeasure3: string;
     strMeasure4: string;
     strMeasure5: string;
     strMeasure6: string;
     strMeasure7: string;
     strMeasure8: string;
     strMeasure9: string;
     strInstructions: string;
 
 }
 
 export interface ApiReponse {
    drinks: DrinkReponse[];
  }
 
 export class DBDrink{
     idDrink: string;
     strDrink: string;
     strDrinkThumb: string;
 
     constructor(idDrink:string,strDrink:string,strDrinkThumb:string){
         this.idDrink = idDrink;
         this.strDrink = strDrink;
         this.strDrinkThumb = strDrinkThumb;
     }
 }