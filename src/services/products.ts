import { axios, axios_auth } from 'helpers/axios';

/* Interface */
import { ProductState } from 'interface';

export function get_all_products(): Promise<ProductState[]> {
  return axios.get('/products').then(({data}) => {
    return data;
  })
}

export function get_product_by_id(id: string): Promise<ProductState> {
  return axios.get(`/products/${id}`).then(({data}) => {
    return data;
  })
}

export function get_product_by_filter(
  color_id: string,
  size: string,
  price_range: number[],
  category_id: string,
  brand_id: string,
  page: number
): Promise<ProductState[]> {
  const query = `color_id=${color_id}&category_id=${category_id}&brand_id=${brand_id}&size=${size}&min_price=${price_range[0]}&max_price=${price_range[1]}&page=${page}`;

  return axios.get(`/products/filter?${query}`).then(({data}) => {
    return data;
  })
}

export function get_top_sale_product(): Promise<ProductState> {
  return axios.get('/products/topsale').then(({data}) => {
    return data;
  })
}

export function toggle_top_sale_product(id: string, top_sale: boolean): Promise<ProductState> {
  return axios_auth.patch(`/products/topsale/${id}/toggle`, JSON.stringify({top_sale: !top_sale})).then(({data}) => {
    return data;
  })
}

export function get_hot_products(): Promise<ProductState[]> {
  return axios.get('/products/hot').then(({data}) => {
    return data;
  })
}

export function toggle_hot_product(id: string, hot: boolean): Promise<ProductState> {
  return axios_auth.patch(`/products/hot/${id}/toggle`, JSON.stringify({hot: !hot})).then(({data}) => {
    return data;
  })
}

export function get_new_products(): Promise<ProductState[]> {
  return axios.get('/products/new').then(({data}) => {
    return data;
  })
}

export function get_viewed_products(): Promise<ProductState[]> {
  return axios.get('/products/viewed').then(({data}) => {
    return data;
  })
}

function get_trash_products(): Promise<ProductState[]> {
  return axios_auth.get(`/products/trash`).then(({data}) => {
    return data;
  })
}

export function create_product(product: ProductState): Promise<ProductState> {
  return axios_auth.post('/products', JSON.stringify(product)).then(({data}) => {
    return data;
  })
}

export function update_product(id: any, product: ProductState): Promise<ProductState> {
  return axios_auth.patch(`/products/${id}/edit`, JSON.stringify(product)).then(({data}) => {
    return data;
  })
}

export function delete_product(id: any): Promise<string> {
  return axios_auth.delete(`/products/${id}`).then(({data}) => data);
}

export function restore_product(id: string): Promise<ProductState> {
  return axios_auth.patch(`/products/${id}/restore`).then(({data}) => data);
}

export function remove_product(id: string): Promise<string> {
  return axios_auth.delete(`/products/${id}/remove`).then(({data}) => data);
}

export default {
  get_all_products,
  get_product_by_id,
  get_product_by_filter,
  get_top_sale_product,
  toggle_top_sale_product,
  get_hot_products,
  toggle_hot_product,
  get_new_products,
  get_viewed_products,
  get_trash_products,
  create_product,
  update_product,
  delete_product,
  restore_product,
  remove_product
}