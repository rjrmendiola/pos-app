import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from '../product';
import { ProductItem } from '../product-item';
import { ProductService } from '../product.service';
import { ProductItemService } from '../product-item.service';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css']
})
export class ProductItemsComponent implements OnInit {
  productItems: ProductItem[] = [];
  products: Product[] = [];
  selectedProductItem: ProductItem | undefined;
  productItemForm!: FormGroup;
  deleteProductItemId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private productItemService: ProductItemService,
    private productService: ProductService,
    private modalService: NgbModal 
  ) {};

  ngOnInit(): void {
    this.initProductItemForm();
    this.getProductItems();
    this.getProducts();
  }

  initProductItemForm(): void {
    this.productItemForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      product_id: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      quantity_in_stock: ['', Validators.required]
    });
  }

  getProductItems(): void {
    this.productItemService.getProductItems()
      .subscribe(productItems => this.productItems = productItems);
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  openModal(content: any, productItem?: ProductItem): void {
    this.selectedProductItem = productItem ? { ...productItem } : undefined;
    if (this.selectedProductItem) {
      // this.productItemForm.patchValue({ name: this.selectedProduct?.name });
      this.productItemForm.patchValue(this.selectedProductItem);
    } else {
      this.productItemForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openDeleteConfirmationModal(content: any, productItemId: number): void {
    this.deleteProductItemId = productItemId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getProductName(productId: number): string {
    const product = this.products.find(product => product.id === productId);
    return product ? product.name : '';
  }

  saveProductItem(productItem: ProductItem): void {
    // Mark form controls as touched
    Object.keys(this.productItemForm.controls).forEach(key => {
      this.productItemForm.get(key)?.markAsTouched();
    });

    if (this.productItemForm.invalid) {
      return;
    }

    if (productItem.id) {
      this.productItemService.updateProductItem(productItem)
        .subscribe(() => {
          this.getProductItems();
          this.modalService.dismissAll();
        });
    } else {
      this.productItemService.createProductItem(productItem)
        .subscribe(() => {
          this.getProductItems();
          this.modalService.dismissAll();
        });
    }
  }

  deleteProductItem(): void {
    if (this.deleteProductItemId) {
      this.productItemService.deleteProductItem(this.deleteProductItemId)
        .subscribe(() => {
          this.getProductItems();
          this.modalService.dismissAll();
        });
    }
  }
}
