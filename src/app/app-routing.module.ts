import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeSelectComponent } from './recipes/recipe-select/recipe-select.component';
import { RecipeNewComponent } from './recipes/recipe-new/recipe-new.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, children:
    [
        {path: '', component: RecipeSelectComponent, pathMatch: 'full'},
        {path: 'new', component: RecipeNewComponent},
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: RecipeNewComponent}
    ]},
    {path: 'shoppinglist', component: ShoppingListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}