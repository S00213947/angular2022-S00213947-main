import { DOCUMENT } from '@angular/common';
import { Component, Inject} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { DrinkReponse } from './cocktail/cocktailresponse';
import { CocktailApiService } from './services/cocktail-api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientApp2022';

cocktaildata: DrinkReponse | any;
cocktailrandom: DrinkReponse | any;
errorMessage:any;
faHeart = faHeart;

  isAuthenticated$ = this.authService.isAuthenticated$


    
  constructor(private _cocktailservice:CocktailApiService, private router: Router, public authService: AuthService){}

  getDrinkDetails(searchTerm:string) : boolean {
    this._cocktailservice.getSearchData(searchTerm).subscribe(
      cocktaildata => {
        this.cocktaildata=cocktaildata;
        console.log('drink name' + this.cocktaildata.name);
      },
      error => this.errorMessage = <any>error
    );
    return false;
    }
  
    getrandomDetails() : boolean {
      this._cocktailservice.getrandomData().subscribe(
        cocktailrandom => {
          this.cocktailrandom=cocktailrandom;
          console.log('drink name' + this.cocktailrandom.drinks[0].strDrink);
        },
        error => this.errorMessage = <any>error
      );
      return false;
      }

      
  
  

handleLogout() {
  this.authService.logout()
}

handleLogin() {
  this.authService.loginWithRedirect({appState: { target: '/profile',}})
}
handleSignUp() {
  this.authService.loginWithRedirect({screen_hint:"signup"})
}
}
