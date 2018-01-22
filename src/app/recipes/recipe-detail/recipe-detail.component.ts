import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeElement: Recipe;
  paramSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.recipeElement = this.recipeService.getRecipe((Number)(params['id']));
      }
    );
  }

  onClickToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeElement.ingredients);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeElement);
    this.router.navigate(['/recipes']);
  }

}
