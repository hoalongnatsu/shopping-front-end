import { axios, axios_auth } from 'helpers/axios';

/* Interface */
import { CategorySate } from 'interface';

export function get_all_categories(): Promise<CategorySate[]> {
  return axios.get('/categories').then(({data}) => {
    return data;
  })
}

export function get_category_by_id(id: string): Promise<CategorySate> {
  return axios.get(`/categories/${id}`).then(({data}) => {
    return data;
  })
}

export function create_category(category: CategorySate): Promise<CategorySate> {
  return axios_auth.post('/categories', JSON.stringify(category)).then(({data}) => {
    return data;
  })
}

export function update_category(id: any, category: CategorySate): Promise<CategorySate> {
  return axios_auth.patch(`/categories/${id}/edit`, JSON.stringify(category)).then(({data}) => {
    return data;
  })
}

export function delete_category(id: any): Promise<CategorySate> {
  return axios_auth.delete(`/categories/${id}/remove`).then(({data}) => data);
}

export default {
  get_all_categories,
  get_category_by_id,
  create_category,
  update_category,
  delete_category
}