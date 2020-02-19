import { axios, axios_auth } from 'helpers/axios';

/* Interface */
import { CategoryState } from 'interface';

export function get_all_categories(): Promise<CategoryState[]> {
  return axios.get('/categories').then(({data}) => {
    return data;
  })
}

export function get_category_by_id(id: string): Promise<CategoryState> {
  return axios.get(`/categories/${id}`).then(({data}) => {
    return data;
  })
}

export function create_category(category: CategoryState): Promise<CategoryState> {
  return axios_auth.post('/categories', JSON.stringify(category)).then(({data}) => {
    return data;
  })
}

export function update_category(id: any, category: CategoryState): Promise<CategoryState> {
  return axios_auth.patch(`/categories/${id}/edit`, JSON.stringify(category)).then(({data}) => {
    return data;
  })
}

export function delete_category(id: any): Promise<string> {
  return axios_auth.delete(`/categories/${id}/remove`).then(({data}) => data);
}

export default {
  get_all_categories,
  get_category_by_id,
  create_category,
  update_category,
  delete_category
}