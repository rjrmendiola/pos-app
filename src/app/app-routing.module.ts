import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemsComponent } from './product-items/product-items.component';
import { SalesComponent } from './sales/sales.component';
import { SaleFormComponent } from './sale-form/sale-form.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/new', component: UsersComponent },
  { path: 'users/:id', component: UsersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: ProductsComponent },
  { path: 'products/:id', component: ProductsComponent },
  { path: 'product-categories', component: ProductCategoriesComponent },
  { path: 'product-categories/new', component: ProductCategoriesComponent },
  { path: 'product-categories/:id', component: ProductCategoriesComponent },
  { path: 'product-items', component: ProductItemsComponent },
  { path: 'product-items/new', component: ProductItemsComponent },
  { path: 'product-items/:id', component: ProductItemsComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'sales/new', component: SalesComponent },
  { path: 'sales/:id', component: SalesComponent },
  { path: 'sale-form/new', component: SaleFormComponent },
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
