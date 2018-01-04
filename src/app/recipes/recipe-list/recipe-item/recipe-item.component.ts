import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe:Recipe;
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(selected:Recipe){
    this.selectedRecipe.emit(selected);
  }
}
