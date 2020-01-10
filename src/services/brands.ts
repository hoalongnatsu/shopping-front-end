import { axios, axios_auth } from 'helpers/axios';

/* Interface */
import { BrandsState } from 'interface';

function get_all_brands(): Promise<BrandsState[]> {
  return axios.get(`/brands`).then(({data}) => {
    return data;
  })
}

export function get_brand_by_id(id: string): Promise<BrandsState> {
  return axios.get(`/brands/${id}`).then(({data}) => {
    return data;
  })
}

function get_trash_brands(): Promise<BrandsState[]> {
  return axios_auth.get(`/brands/trash`).then(({data}) => {
    return data;
  })
}

function create_brand(brand: BrandsState): Promise<BrandsState> {
  return axios_auth.post(`/brands`, JSON.stringify(brand)).then(({data}) => {
    return data;
  })
}

export function update_brand(id: any, brand: BrandsState): Promise<BrandsState> {
  return axios_auth.patch(`/brands/${id}/edit`, JSON.stringify(brand)).then(({data}) => {
    return data;
  })
}

export function delete_brand(id: string): Promise<string> {
  return axios_auth.delete(`/brands/${id}`).then(({data}) => data);
}

export function restore_brand(id: string): Promise<BrandsState> {
  return axios_auth.delete(`/brands/${id}/restore`).then(({data}) => data);
}

export function remove_brand(id: string): Promise<string> {
  return axios_auth.delete(`/brands/${id}/remove`).then(({data}) => data);
}

export default {
  get_all_brands,
  get_brand_by_id,
  get_trash_brands,
  create_brand,
  update_brand,
  delete_brand,
  restore_brand,
  remove_brand
}