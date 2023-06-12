import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductItem } from '../product-item';
import { Sale } from '../sale';
import { SaleItem } from '../sale-item';
import { ProductItemService } from '../product-item.service';
import { SaleService } from '../sale.service';
import { SaleItemService } from '../sale-item.service';

interface PaymentMethods {
  [key: number]: string;
}

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent implements OnInit {
  productItems: ProductItem[] = [];
  saleForm!: FormGroup;
  paymentMethods: PaymentMethods = {
    1: 'Cash',
    2: 'Credit Cards',
    3: 'Debit Cards',
    4: 'Mobile Payments',
    5: 'Gift Cards',
    6: 'Digital Wallets',
    7: 'Checks',
  };

  constructor(
    private formBuilder: FormBuilder,
    private productItemService: ProductItemService,
    private saleService: SaleService,
    private saleItemService: SaleItemService,
  ) { }

  ngOnInit() {
    this.saleForm = this.formBuilder.group({
      order_number: ['', Validators.required],
      customer_name: [''],
      customer_phone: [''],
      customer_address: [''],
      order_date: ['', Validators.required],
      payment_method: ['', Validators.required],
      saleItems: this.formBuilder.array([])
    });

    // Add an initial sale item form group
    this.addSaleItem();

    this.getProductItems();
  }

  getProductItems(): void {
    this.productItemService.getProductItems()
      .subscribe(productItems => this.productItems = productItems);
  }

  get saleItems() {
    return this.saleForm.get('saleItems') as FormArray;
  }

  addSaleItem() {
    const saleItem = this.formBuilder.group({
      product_item_id: ['', Validators.required],
      price: [''],
      quantity: ['', Validators.required],
      item_total_amount: ['', Validators.required]
    });

    this.saleItems.push(saleItem);
  }

  removeSaleItem(index: number) {
    this.saleItems.removeAt(index);
  }

  onProductItemChange(index: number) {
    // const productItemId = this.saleItems.controls[index].get('product_item_id').value;
    // const selectedProductItem = this.productItems.find(item => item.id === productItemId);
    // if (selectedProductItem) {
    //   this.saleItems.controls[index].patchValue({
    //     price: selectedProductItem.price
    //   });
    //   this.updateTotalAmount(index);
    // }
    const control = this.saleItems.controls[index].get('product_item_id');
    const productItemId = control ? control.value : null;
    const selectedProductItem = this.productItems.find(item => String(item.id) === String(productItemId));
    if (selectedProductItem) {
      this.saleItems.controls[index].patchValue({
        price: selectedProductItem.price
      });
      this.updateTotalAmount(index);
    }
  }

  onQuantityChange(index: number) {
    this.updateTotalAmount(index);
  }

  updateTotalAmount(index: number) {
    const quantityControl = this.saleItems.controls[index].get('quantity');
    const quantity = quantityControl ? quantityControl.value : null;
    const priceControl = this.saleItems.controls[index].get('price');
    const price = priceControl? priceControl.value : null;
    const totalAmount = quantity * price;
    this.saleItems.controls[index].patchValue({
      item_total_amount: totalAmount
    });
  }

  onSubmit() {
    if (this.saleForm.invalid) {
      return;
    }

    const sale: Sale = this.saleForm.value;

    // Get the value of the saleItems form array
    // const saleItems = this.saleForm.get('saleItems') as FormArray;
    const saleItems = this.saleItems.value;

    var overall_total_amount = 0;
    // Retrieve the submitted sales items
    for (const key in saleItems) {
      var item = saleItems[key];
      overall_total_amount += item['item_total_amount'];
    }

    // const submittedSaleItems = saleItems.controls.forEach((control: AbstractControl) => {
    //   const formGroup = control as FormGroup;
    //   // Access formGroup properties using formGroup.get('property')
    //   overall_total_amount += formGroup.get('total_amount')?.value ?? null;

    //   return {
    //     product_item_id: formGroup.get('product_item_id')?.value ?? null,
    //     quantity: formGroup.get('quantity')?.value ?? null,
    //     total_amount: formGroup.get('total_amount')?.value ?? null
    //   };
    // });
    
    sale['total_amount'] = overall_total_amount;

    this.saleService.createSale(sale).subscribe(
        (saleResponse) => {
        // Assign the sale_id to each sale item and save them
        for (const saleItem of saleItems) {
          saleItem.sale_id = saleResponse.id; // Assuming the ID is returned from the API
          this.saleItemService.createSaleItem(saleItem).subscribe(
            (saleItemResponse) => {
              console.log('Sale item created successfully:', saleItemResponse);
            },
            (error) => {
              console.error('Error creating sale item:', error);
            }
          );
        }

        this.saleForm.reset();
        this.saleItems.clear();
      },
      (error) => {
        console.error('Error creating sale:', error);
      }
    );
  }

  getObjectKeys(obj: PaymentMethods): number[] {
    return Object.keys(obj).map(Number);
  }
}