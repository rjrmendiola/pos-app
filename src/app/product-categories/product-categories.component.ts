import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductCategory } from '../product-category';
import { ProductCategoryService } from '../product-category.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
  productCategories: ProductCategory[] = [];
  selectedProductCategory: ProductCategory | undefined;
  // By using the "!" non-null assertion operator, 
  // we inform TypeScript that the userForm property will be initialized in the initUserForm() method.
  productCategoryForm!: FormGroup;
  deleteProductCategoryId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initProductCategoryForm();
    this.getProductCategories();
  }

  initProductCategoryForm(): void {
    this.productCategoryForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required]
    });
  }

  getProductCategories(): void {
    this.productCategoryService.getProductCategories()
      .subscribe(productCategories => this.productCategories = productCategories);
  }

  openModal(content: any, productCategory?: ProductCategory): void {
    this.selectedProductCategory = productCategory ? { ...productCategory } : undefined;
    if (this.selectedProductCategory) {
      // this.productCategoryForm.patchValue({ name: this.selectedProductCategory?.name });
      this.productCategoryForm.patchValue(this.selectedProductCategory);
    } else {
      this.productCategoryForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openDeleteConfirmationModal(content: any, productCategoryId: number): void {
    this.deleteProductCategoryId = productCategoryId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  
  saveProductCategory(productCategory: ProductCategory): void {
    // Mark form controls as touched
    Object.keys(this.productCategoryForm.controls).forEach(key => {
      this.productCategoryForm.get(key)?.markAsTouched();
    });

    if (this.productCategoryForm.invalid) {
      return;
    }

    if (productCategory.id) {
      this.productCategoryService.updateProductCategory(productCategory)
        .subscribe(() => {
          this.getProductCategories();
          this.modalService.dismissAll();
        });
    } else {
      this.productCategoryService.createProductCategory(productCategory)
        .subscribe(() => {
          this.getProductCategories();
          this.modalService.dismissAll();
        });
    }
  }

  deleteProductCategory(): void {
    if (this.deleteProductCategoryId) {
      this.productCategoryService.deleteProductCategory(this.deleteProductCategoryId)
        .subscribe(() => {
          this.getProductCategories();
          this.modalService.dismissAll();
        });
    }
  }
}
