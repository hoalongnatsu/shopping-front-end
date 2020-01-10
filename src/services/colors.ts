import { axios, axios_auth } from 'helpers/axios';

/* Interface */
import { ColorsState } from 'interface';

export function get_all_colors(): Promise<ColorsState[]> {
  return axios.get('/colors').then(({data}) => {
    return data;
  })
}

export function get_color_by_id(id: string): Promise<ColorsState> {
  return axios.get(`/colors/${id}`).then(({data}) => {
    return data;
  })
}

export function get_trash_colors(): Promise<ColorsState[]> {
  return axios_auth.get('/colors/trash').then(({data}) => {
    return data;
  })
}

export function create_color(color: ColorsState): Promise<ColorsState> {
  return axios_auth.post('/colors', JSON.stringify(color)).then(({data}) => {
    return data;
  })
}

export function update_color(id: any, color: ColorsState): Promise<ColorsState> {
  return axios_auth.patch(`/colors/${id}/edit`, JSON.stringify(color)).then(({data}) => {
    return data;
  })
}

export function delete_color(id: string): Promise<string> {
 return axios_auth.delete(`/colors/${id}`).then(({data}) => data);
}

export function restore_color(id: string): Promise<ColorsState> {
  return axios_auth.patch(`/colors/${id}/restore`).then(({data}) => {
    return data;
  })
}

export function remove_color(id: string): Promise<string> {
  return axios_auth.delete(`/colors/${id}/remove`).then(({data}) => {
    return data;
  })
}

export default {
  get_all_colors,
  get_color_by_id,
  get_trash_colors,
  create_color,
  update_color,
  delete_color,
  restore_color,
  remove_color
}