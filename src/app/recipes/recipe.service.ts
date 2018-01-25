import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService, private http: Http) {}

    private recipes: Recipe[] = [];

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

    sendRecipes () {
        return this.http.put('https://ng-recipe-project-93d23.firebaseio.com/data.json', this.recipes);
    }

    getRecipesFromDB () {
        return this.http.get('https://ng-recipe-project-93d23.firebaseio.com/data.json').map
        (
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
                    if (!recipe['îngredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw('Something went wrong!!!');
            }
        );
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}