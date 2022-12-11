interface PageableSortProps {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface PagableProps {
  sort: PageableSortProps;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ProductProps {
  product_id: string;
  name: string;
  tags: string;
  price: number;
  description: string;
  amount: number;
  image_url?: string;
  category: {
    category_id: string;
    description: string;
    image_url?: string;
  }
}

export interface ProductFilterProps {
  content: ProductProps[];
  pageable: PagableProps;
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: PageableSortProps;
  first: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface PedidoProps {
  order_id: string
  draft: boolean
  paid: boolean
  withdrawn: boolean
  description: string
  discount: number
  employee: Employee
  client: Client
  products_order: ProductsOrder[]
}

export interface Employee {
  employee_id: string
  name: string
  entry_date: string
  is_active: boolean
  role: Role
}

export interface Role {
  role_id: string
  description: string
}

export interface Client {
  client_id: string
  name: string
  cpf: string
  rg: any
  email_address: string
  phone_number: string
  address: any
}

export interface ProductsOrder {
  product_order_id: number
  product: Product
  amount: number
}

export interface Product {
  product_id: string
  name: string
  tags: string
  price: number
  description: any
  amount: number
  image_url: string
  category: Category
}

export interface Category {
  category_id: string
  description: string
  image_url: any
}
