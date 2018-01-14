import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    constructor(private shoppingListService: ShoppingListService){}

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
        'This is simply a test', 
        'http://www.refikaninmutfagi.com/wp-content/uploads/2016/12/N6A7745-1.jpg',
        [new Ingredient('Carrot', 7),
        new Ingredient('Tomatoes', 12),
        new Ingredient('Meat', 1)]),
        new Recipe('Another Test Recipe', 
        'This is simply a test', 
        'https://i.ytimg.com/vi/k1mnynExXlo/maxresdefault.jpg',
        [
            new Ingredient('Chicken', 1),
            new Ingredient('Wheat', 20),
            new Ingredient('Pepper', 5)
        ]
    )
      ];

    getRecipeList() {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}