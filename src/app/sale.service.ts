import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from './sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private baseUrl = 'http://localhost:8000/api/v1/sales';

  constructor(private http: HttpClient) { }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.baseUrl);
  }

  getSale(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.baseUrl}/${id}`);
  }

  createSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(`${this.baseUrl}/create`, sale);
  }

  updateSale(sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.baseUrl}/update/${sale.id}`, sale);
  }

  deleteSale(id: number): Observable<Sale> {
    return this.http.delete<Sale>(`${this.baseUrl}/delete/${id}`);
  }
}
