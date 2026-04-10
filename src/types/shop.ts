export interface Price {
  id: string;
  unit_amount: number;
  currency: string;
}

export interface Rug {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  metadata: {
    stock?: string;
    one_of_a_kind?: string;
    [key: string]: string | undefined;
  };
  active: boolean;
  default_price?: Price;
}

export interface Order {
  id: string;
  amount: number;
  currency: string;
  customer_email: string;
  status: string;
  created_at: number;
}
