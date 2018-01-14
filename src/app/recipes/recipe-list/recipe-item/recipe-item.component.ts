import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() id: number;

  constructor(private recipeService: RecipeService, 
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  onSelect() {
    this.router.navigate([this.id], {relativeTo: this.route});
  }
}
