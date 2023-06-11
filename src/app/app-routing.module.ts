import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/new', component: UsersComponent },
  { path: 'users/:id', component: UsersComponent },
  { path: 'product-categories', component: ProductCategoriesComponent },
  { path: 'product-categories/new', component: ProductCategoriesComponent },
  { path: 'product-categories/:id', component: ProductCategoriesComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
