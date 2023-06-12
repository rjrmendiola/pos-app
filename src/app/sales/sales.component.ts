import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Sale } from '../sale';
import { SaleItem } from '../sale-item';
import { SaleService } from '../sale.service';

interface PaymentMethods {
  [key: number]: string;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  sales: Sale[] = [];
  saleItems: SaleItem[] = [];
  selectedSale: Sale | undefined;
  saleForm!: FormGroup;
  deleteSaleId: number | undefined;
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
    private saleService: SaleService,
    private modalService: NgbModal 
  ) {};

  ngOnInit(): void {
    this.initSaleForm();
    this.getSales();
  }

  initSaleForm(): void {
    this.saleForm = this.formBuilder.group({
      id: [''],
      order_number: ['', Validators.required],
      customer_name: [''],
      customer_phone: [''],
      customer_address: [''],
      order_date: ['', Validators.required],
      payment_method: [''],
      // total_amount: ['', Validators.required]
      saleItems: this.formBuilder.array([])
    });
  }

  get saleItemsFormArray() {
    return this.saleForm.get('saleItems') as FormArray;
  }

  getSales(): void {
    this.saleService.getSales()
      .subscribe(sales => this.sales = sales);
  }

  openModal(content: any, sale?: Sale): void {
    this.selectedSale = sale ? { ...sale } : undefined;
    if (this.selectedSale) {
      // this.productItemForm.patchValue({ name: this.selectedSale?.name });
      this.saleForm.patchValue(this.selectedSale);
    } else {
      this.saleForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openDeleteConfirmationModal(content: any, saleId?: number): void {
    this.deleteSaleId = saleId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  saveSale(sale: Sale): void {
    // Mark form controls as touched
    Object.keys(this.saleForm.controls).forEach(key => {
      this.saleForm.get(key)?.markAsTouched();
    });

    if (this.saleForm.invalid) {
      return;
    }

    if (sale.id) {
      this.saleService.updateSale(sale)
        .subscribe(() => {
          this.getSales();
          this.modalService.dismissAll();
        });
    } else {
      this.saleService.createSale(sale)
        .subscribe(() => {
          this.getSales();
          this.modalService.dismissAll();
        });
    }
  }

  deleteSale(): void {
    if (this.deleteSaleId) {
      this.saleService.deleteSale(this.deleteSaleId)
        .subscribe(() => {
          this.getSales();
          this.modalService.dismissAll();
        });
    }
  }

  getObjectKeys(obj: PaymentMethods): number[] {
    return Object.keys(obj).map(Number);
  }
}
