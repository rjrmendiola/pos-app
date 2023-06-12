import { SaleItem } from "./sale-item";

export interface Sale {
    id?: number;
    order_number: string;
    customer_name?: string;
    customer_phone?: string;
    customer_address?: string;
    order_date: Date;
    payment_method: number;
    total_amount?: number;
    sale_items: SaleItem[]
  }