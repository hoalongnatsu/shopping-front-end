export interface LoadingState {
  [GET_COLORS: string]: boolean,
  CREATE_COLOR: boolean,
  UPDATE_COLOR: boolean,
  DELETE_COLOR: boolean
}

export interface ErrorsState {
  [GET_COLORS: string]: boolean,
  CREATE_COLOR: boolean,
  UPDATE_COLOR: boolean,
  DELETE_COLOR: boolean
}

export interface FeedbackState {
  error: string
}

export interface ColorsState {
  _id?: string,
  name: string,
  code: string,
}

export interface CategoryState {
  _id?: string,
  name: string,
  slug: string
}

export interface BrandsState {
  _id?: string,
  name: string,
  logo?: string,
}

export interface UserState {
  username: string,
  email: string,
  jwt: string,
  admin: string,
  meta?: UserMeta
}

export interface UserMeta {
  avatar: string,
  sex: string
}

export interface ProductPropValues {
  size: string[],
  images: string[],
}

export interface ProductProps {
  [color_id: string]: ProductPropValues
}

export interface ProductState {
  _id?: string,
  name: string,
  slug: string,
  top_sale: boolean,
  hot: boolean,
  category: CategoryState,
  brand: BrandsState,
  short_descripsion: string,
  descripsion: string,
  colors: ColorsState[],
  price: number,
  sale: number,
  image_cover: string,
  props: ProductProps
}

export interface ProductFiltersState {
  color_id?: string,
  size?: string,
  price_range?: number[],
  category_id?: string,
  brand_id?: string,
  page?: number
}

export interface ProductPagination {
  total: number,
  per_page: number
}

export interface TrashState {
  colors: ColorsState[],
  brands: BrandsState[],
  products: ProductState[]
}

export interface RootState {
  loading: LoadingState,
  errors: ErrorsState,
  feedback: FeedbackState,
  user: UserState,
  colors: ColorsState[],
  categories: CategoryState[],
  brands: BrandsState[],
  products: ProductState[],
  product_pagination: ProductPagination,
  filters: ProductFiltersState,
  trash: TrashState,

  // Initialize State
  top_sale_product: ProductState,
  hot_products: ProductState[],
  new_products: ProductState[],
  viewed_products: ProductState[],
}