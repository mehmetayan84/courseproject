import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

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

    addRecipe(recipe: Recipe) {
        console.log(recipe);
        this.recipes.push(recipe);
        console.log(this.recipes);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipeList() {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    searchIngredient(index: number, deletedIngredient: string) {
        const recipe = this.getRecipe(index);
        for(let ingredient of recipe.ingredients) {
            if (deletedIngredient === ingredient.name) {
                return true;
            }
        }

        return false;
    }

    removeIngredient(index: number, deletedIngredient: string) {
        let recipe: Recipe = this.getRecipe(index);
        let deletingIndex: number;
        for(let ingredient of recipe.ingredients) {
            if(ingredient.name === deletedIngredient) {
                deletingIndex = recipe.ingredients.indexOf(ingredient);
            }
        }
        recipe.ingredients.splice(deletingIndex, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(recipe: Recipe) {
        this.recipes.splice(this.recipes.indexOf(recipe), 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}