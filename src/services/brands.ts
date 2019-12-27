import axios from 'axios';

/* Interface */
import { BrandsState } from 'interface';

const API = process.env.REACT_APP_API_URL;

function get_all_brands(): Promise<BrandsState[]> {
  return axios.get(`${API}/brands`).then(({data}) => {
    return data;
  })
}

export function get_brand_by_id(id: string): Promise<BrandsState> {
  return axios.get(`${API}/brands/${id}`).then(({data}) => {
    return data;
  })
}

function create_brand(brand: BrandsState): Promise<BrandsState> {
  return axios.post(`${API}/brands`, JSON.stringify(brand), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(({data}) => {
    return data;
  })
}

export function update_brand(id: any, brand: BrandsState): Promise<BrandsState> {
  return axios.patch(`${API}/brands/${id}/edit`, JSON.stringify(brand), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(({data}) => {
    return data;
  })
}

export function delete_brand(id: string) {
  return axios.delete(`${API}/brands/${id}`).then(({data}) => data);
 }

export default {
  get_all_brands,
  get_brand_by_id,
  create_brand,
  update_brand,
  delete_brand
}