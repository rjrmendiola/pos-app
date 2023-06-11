import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from '../product';
import { ProductCategory } from '../product-category';
import { ProductService } from '../product.service';
import { ProductCategoryService } from '../product-category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productCategories: ProductCategory[] = [];
  selectedProduct: Product | undefined;
  productForm!: FormGroup;
  deleteProductId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private modalService: NgbModal 
  ) {};

  ngOnInit(): void {
    this.initProductForm();
    this.getProducts();
    this.getProductCategories();
  }

  initProductForm(): void {
    this.productForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      product_category_id: ['', Validators.required]
    });
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  getProductCategories(): void {
    this.productCategoryService.getProductCategories()
      .subscribe(productCategories => this.productCategories = productCategories);
  }

  openModal(content: any, product?: Product): void {
    this.selectedProduct = product ? { ...product } : undefined;
    if (this.selectedProduct) {
      // this.productForm.patchValue({ name: this.selectedProduct?.name });
      this.productForm.patchValue(this.selectedProduct);
    } else {
      this.productForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openDeleteConfirmationModal(content: any, productId: number): void {
    this.deleteProductId = productId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getProductCategoryName(categoryId: number): string {
    const category = this.productCategories.find(category => category.id === categoryId);
    return category ? category.name : '';
  }

  saveProduct(product: Product): void {
    // Mark form controls as touched
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.get(key)?.markAsTouched();
    });

    if (this.productForm.invalid) {
      return;
    }

    if (product.id) {
      this.productService.updateProduct(product)
        .subscribe(() => {
          this.getProducts();
          this.modalService.dismissAll();
        });
    } else {
      this.productService.createProduct(product)
        .subscribe(() => {
          this.getProducts();
          this.modalService.dismissAll();
        });
    }
  }

  deleteProduct(): void {
    if (this.deleteProductId) {
      this.productService.deleteProduct(this.deleteProductId)
        .subscribe(() => {
          this.getProducts();
          this.modalService.dismissAll();
        });
    }
  }
}
