import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemsComponent } from './product-items/product-items.component';
import { SalesComponent } from './sales/sales.component';
import { SaleFormComponent } from './sale-form/sale-form.component';

import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'products/new', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'product-categories', component: ProductCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'product-categories/new', component: ProductCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'product-categories/:id', component: ProductCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'product-items', component: ProductItemsComponent, canActivate: [AuthGuard] },
  { path: 'product-items/new', component: ProductItemsComponent, canActivate: [AuthGuard] },
  { path: 'product-items/:id', component: ProductItemsComponent, canActivate: [AuthGuard] },
  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
  { path: 'sales/new', component: SalesComponent, canActivate: [AuthGuard] },
  { path: 'sales/:id', component: SalesComponent, canActivate: [AuthGuard] },
  { path: 'sale-form/new', component: SaleFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // { path: 'logout', redirectTo: '/login', pathMatch: 'full' }, // Logout route
  { path: '**', redirectTo: '', pathMatch: 'full' } // Default route for unknown paths
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
