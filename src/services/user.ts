import axios from 'axios';

/* Interface */
import { UserState } from 'interface';

const API = process.env.REACT_APP_API_URL;

function login(values: any): Promise<UserState> {
  return axios.post(`${API}/users/login`, JSON.stringify(values), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(({data}) => {
    return data
  })
}

function register(values: any): Promise<UserState> {
  return axios.post(`${API}/users/register`, JSON.stringify(values), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(({data}) => {
    return data
  })
}

export default {
  login,
  register
}