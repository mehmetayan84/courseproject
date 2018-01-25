import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientForm') shoppingListForm: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editSubscription = this.shoppingListService.ingredientEdited.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue(
          {
            'name': this.editedItem.name,
            'amount': this.editedItem.amount
          }
        );
      }
    );
  }

  onDelete() {
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  onAddItem(ingredientForm: NgForm) {
    if (!this.editMode) {
      this.shoppingListService.addIngredient(
        new Ingredient(ingredientForm.value.name,
        Number(ingredientForm.value.amount))
      );
    } else {
      this.shoppingListService.updateIngredient(this.editedItemIndex,
      new Ingredient(ingredientForm.value.name, Number(ingredientForm.value.amount)));
      this.editMode = !this.editMode;
    }
    this.shoppingListForm.reset();
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

}
