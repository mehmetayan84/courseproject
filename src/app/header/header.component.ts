import { Component, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor (private recipeService: RecipeService) {};
  
  onsaveData() {
    this.recipeService.sendRecipes().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onGetData() {
    this.recipeService.getRecipesFromDB().subscribe (
      (recipes: Recipe[]) => this.recipeService.setRecipes(recipes),
      (error) => console.log(error)
    );
  }

}
