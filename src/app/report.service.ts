import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8000/api/v1/reports';

  constructor(private http: HttpClient) { }

  getStocksByProductCategory() {
    return this.http.get<any>(`${this.baseUrl}/stocks-by-product-category`);
  }
}
