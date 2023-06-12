import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleItem } from './sale-item';

@Injectable({
  providedIn: 'root'
})
export class SaleItemService {
  private baseUrl = 'http://localhost:8000/api/v1/sale-items';

  constructor(private http: HttpClient) { }

  getSaleItems(): Observable<SaleItem[]> {
    return this.http.get<SaleItem[]>(this.baseUrl);
  }

  getSaleItem(id: number): Observable<SaleItem> {
    return this.http.get<SaleItem>(`${this.baseUrl}/${id}`);
  }

  createSaleItem(saleItem: SaleItem): Observable<SaleItem> {
    return this.http.post<SaleItem>(`${this.baseUrl}/create`, saleItem);
  }

  updateSaleItem(saleItem: SaleItem): Observable<SaleItem> {
    return this.http.put<SaleItem>(`${this.baseUrl}/update/${saleItem.id}`, saleItem);
  }

  deleteSaleItem(id: number): Observable<SaleItem> {
    return this.http.delete<SaleItem>(`${this.baseUrl}/delete/${id}`);
  }
}
