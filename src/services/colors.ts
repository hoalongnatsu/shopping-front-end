import axios from 'axios';

/* Interface */
import { ColorsState } from 'interface';

const API = process.env.REACT_APP_API_URL;

export function get_all_colors(): Promise<ColorsState[]> {
  return axios.get(`${API}/colors`).then(({data}) => {
    return data;
  })
}

export function get_color_by_id(id: string): Promise<ColorsState> {
  return axios.get(`${API}/colors/${id}`).then(({data}) => {
    return data;
  })
}

export function create_color(color: ColorsState): Promise<ColorsState> {
  return axios.post(`${API}/colors`, JSON.stringify(color), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(({data}) => {
    return data;
  })
}

export function update_color(id: any, color: ColorsState): Promise<ColorsState> {
  return axios.patch(`${API}/colors/${id}/edit`, JSON.stringify(color), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(({data}) => {
    return data;
  })
}

export function delete_color(id: string) {
 return axios.delete(`${API}/colors/${id}`).then(({data}) => data);
}

export default {
  get_all_colors,
  get_color_by_id,
  create_color,
  update_color,
  delete_color
}