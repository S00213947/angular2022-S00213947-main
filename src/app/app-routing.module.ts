import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { CocktailListComponent } from './cocktail/cocktail-list/cocktail-list.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cocktails',component: CocktailListComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FontAwesomeModule],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
