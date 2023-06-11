import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductItem } from './product-item';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {
  private baseUrl = 'http://localhost:8000/api/v1/product-items';

  constructor(private http: HttpClient) { }

  getProductItems(): Observable<ProductItem[]> {
    return this.http.get<ProductItem[]>(this.baseUrl);
  }

  getProductItem(id: number): Observable<ProductItem> {
    return this.http.get<ProductItem>(`${this.baseUrl}/${id}`);
  }

  createProductItem(productItem: ProductItem): Observable<ProductItem> {
    return this.http.post<ProductItem>(`${this.baseUrl}/create`, productItem);
  }

  updateProductItem(productItem: ProductItem): Observable<ProductItem> {
    return this.http.put<ProductItem>(`${this.baseUrl}/update/${productItem.id}`, productItem);
  }

  deleteProductItem(id: number): Observable<ProductItem> {
    return this.http.delete<ProductItem>(`${this.baseUrl}/delete/${id}`);
  }
}
