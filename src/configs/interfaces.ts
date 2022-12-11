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
