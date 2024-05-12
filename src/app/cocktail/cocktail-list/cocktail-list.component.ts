import { Component, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/cocktail';
import { CocktailService } from 'src/app/cocktail.service';
import { FakecocktailService } from 'src/app/fakecocktail.service';
import { CocktailApiService } from 'src/app/services/cocktail-api.service';
import { DrinkReponse } from '../cocktailresponse';
import { Observable, catchError, of, tap } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { AuthService } from '@auth0/auth0-angular';
import { FavoritesService } from 'src/app/favorites.service';
import { ChangeDetectorRef } from '@angular/core';

library.add(faHeart);

interface Drink {
  name: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css'],
  
  
})
export class CocktailListComponent implements OnInit {

  drinks = [
    { name: 'Mojito', image: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg', link: '/drink/11000-Mojito-Cocktail' },
    { name: 'Old Fashioned', image: 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg', link: 'drink/11001-Old-Fashioned-Cocktail' },
    { name: 'Long Island Tea', image: 'https://www.thecocktaildb.com/images/media/drink/nkwr4c1606770558.jpg', link: '/drink/11002-Long-Island-Tea-Cocktail' },
    { name: 'Whisky Sour', image: 'https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg', link: '/drink/11004-Whiskey-Sour-Cocktail' },
    { name: 'Daquiri', image: 'https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg', link: '/drink/11006-Daiquiri-Cocktail' },
  ];
  displayedDrinks: Drink[] = [];

  cocktailList: Cocktail[] = [];
  message: string = "";
  cocktaildata: DrinkReponse | any;
cocktailrandom: DrinkReponse | any;
errorMessage:any;
icon=faHeart;
isFavorited: boolean = false;
searchPerformed: boolean = false; 


  currentCocktail : Cocktail | undefined;
  showCocktailForm: boolean = false;
 

  constructor(private _cocktailservice:CocktailApiService,public auth: AuthService, private cocktailservice: CocktailService,private favoritesService: FavoritesService, private cdr: ChangeDetectorRef) { }
 // constructor(private cocktailservice: FakecocktailService) { }
 ngOnInit(): void {
  this.cocktailservice.getCocktails().subscribe({
    next: (value: Cocktail[]) => {
      this.cocktailList = value;
      this.displayedDrinks = [
        { name: 'Mojito', image: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg', link: '/drink/11000-Mojito-Cocktail' },
        { name: 'Old Fashioned', image: 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg', link: '/drink/11001-Old-Fashioned-Cocktail' },
        { name: 'Long Island Tea', image: 'https://www.thecocktaildb.com/images/media/drink/nkwr4c1606770558.jpg', link: '/drink/11002-Long-Island-Tea-Cocktail' }
      ];
    },
    complete: () => console.log("cocktail service finished"),
    error: (err) => {
      console.error('Failed to load cocktails:', err);
      this.message = 'Failed to load cocktails';
    }
  });
}



  clicked (cocktail: Cocktail): void {
    this.currentCocktail = cocktail;
  }

  openAddCocktail(): void {
    this.currentCocktail = undefined;
    this.showCocktailForm = true;
  }

  openEditCocktail(): void {
    this.showCocktailForm = true;
  }

  dismissAlert() {
    this.message = "";
  }

  toggleFavourite() 
  {
    this.isFavorited = !this.isFavorited;
  }

  getDrinkDetails(searchTerm: string) : boolean {
    this._cocktailservice.getSearchData(searchTerm).subscribe(
      cocktaildata => {
        this.cocktaildata = cocktaildata;
        console.log('this.cocktaildata: ', this.cocktaildata);
        console.log('drink name' + this.cocktaildata.name);
        this.searchPerformed = true; // Consider setting it here if it depends on successful data fetch
      },
      error => {
        this.errorMessage = <any>error;
        this.searchPerformed = false; // Reset or handle error as needed
      }
    );
    return false; // Consider what this return value is used for
  }

  getrandomDetails(): void {
    this._cocktailservice.getrandomData().subscribe(
      cocktailrandom => {
        this.cocktailrandom = cocktailrandom;
        console.log('Cocktail Random Data:', this.cocktailrandom);
        this.searchPerformed = true; // Set this if using the same flag for any search
        // or this.randomSearchPerformed = true; if using a separate flag
      },
      error => {
        this.errorMessage = <any>error;
        console.error('Error fetching random cocktail:', error);
      }
    );
  }

    addToFavorites(cocktail: Cocktail): void {
      console.log('cocktail: ', cocktail);
      if (!cocktail || !cocktail.idDrink) {
        console.error('Attempt to add a drink with undefined or null ID');
        return;
      }
    
      this.favoritesService.addToFavorites(cocktail).subscribe({
        next: (response) => console.log('Favorite added successfully!', response),
        error: (err) => {
          console.error('Error adding to favorites:', err);
          this.message = 'Error adding to favorites';
        }
      });
    }
    
    removeFromFavorites(cocktail: Cocktail): void {
      if (!cocktail.idDrink) {
        console.error('Attempt to remove a cocktail with undefined ID');
        return;
      }
      this.favoritesService.removeFromFavorites(cocktail.idDrink);
    }

      addFavoriteCocktail(cocktailId: string): void {
        this.auth.user$.subscribe((user) => {
          if (user) {
            const userId = user!.sub!;
            this._cocktailservice.addFavorite(userId, cocktailId).subscribe((response) => {
              console.log('Cocktail added to favorites', response);
            });
          } else {
            console.error('User Id is undefined');
          }
        });
      }
      
      handleSearch(searchTerm: string) {
        if (searchTerm) {
          this.getDrinkDetails(searchTerm);
          this.searchPerformed = true;
        }
      }
     
     

      getsandomDetails(): Observable<any> {
        return this._cocktailservice.getrandomData().pipe(
          tap(cocktailrandom => {
            this.cocktailrandom = cocktailrandom;
            console.log('drink name' + this.cocktailrandom.name);
          }),
          catchError(error => {
            this.errorMessage = <any>error;
            return of(null);
          })
        );
      }



  updateCocktail(id: string, cocktail: Cocktail): void {
    console.log('updating ');
    console.table (cocktail);
    this.cocktailservice.updateCocktail(id, cocktail)
      .subscribe({
        next: cocktail => {
          console.log(JSON.stringify(cocktail) + ' has been updated');
          this.message = " cocktail has been updated";
          this.ngOnInit();
          this.currentCocktail=undefined;
        },
        error: (err) => this.message = err
      }); 
  }

  cocktailFormClose(cocktail?: any): void {
    this.showCocktailForm = false;
    console.table(cocktail);
    if (cocktail == null) {
      this.message = "form closed without saving";
      this.currentCocktail = undefined
    }
    else if (this.currentCocktail == null) {
     this.addNewCocktail(cocktail);
    }
    else {
     this.updateCocktail(this.currentCocktail.idDrink, cocktail)
    }
  }

addNewCocktail(newCocktail: Cocktail): void {
  console.log('adding new cocktail ' + JSON.stringify(newCocktail));
  this.cocktailservice.addCocktail({ ...newCocktail })
    .subscribe({
      next: cocktail => {
        console.log(JSON.stringify(cocktail) + ' has been added');
        this.message = "new cocktail has been added";
        this.ngOnInit();
      },
      error: (err) => this.message = err
    });
  }
  


  deleteCocktail() {
    console.log('deleting a drink ');
    if (this.currentCocktail) {
      this.cocktailservice.deleteCocktail(this.currentCocktail.idDrink)
        .subscribe({
          next: cocktail => {
            console.log(JSON.stringify(cocktail) + ' has been deleted');
            this.message = "drink has been deleted";
            this.ngOnInit();
            this.currentCocktail=undefined;
          },
          error: (err) => this.message = err
        });
    }
  }
  
  isSelected(cocktail: Cocktail): boolean {
    if (!cocktail || !this.currentCocktail) {
      return false;
    }
    else {
      return cocktail.idDrink === this.currentCocktail.idDrink;
  
    }
  }
  
  
}