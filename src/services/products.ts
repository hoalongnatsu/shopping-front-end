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

export function delete_product(id: any): Promise<ProductState> {
  return axios_auth.delete(`/products/${id}`).then(({data}) => data);
}

export default {
  get_all_products,
  get_product_by_id,
  create_product,
  update_product,
  delete_product
}