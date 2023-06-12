import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemsComponent } from './product-items/product-items.component';
import { SalesComponent } from './sales/sales.component';
import { SaleItemsComponent } from './sale-items/sale-items.component';

import { AppRoutingModule } from './app-routing.module';
import { SaleFormComponent } from './sale-form/sale-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProductCategoriesComponent,
    ProductsComponent,
    ProductItemsComponent,
    SalesComponent,
    SaleItemsComponent,
    SaleFormComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
