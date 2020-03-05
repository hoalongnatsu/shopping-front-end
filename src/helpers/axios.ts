import a from 'axios';

const API = process.env.REACT_APP_API_URL;

export const axios = a.create({ baseURL: API });

export const axios_json = a.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const axios_auth = a.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  }
})

axios_auth.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('user') as string)?.jwt;

  if (token) {
    config.headers['token'] = token;
  }
  return config;
}, (error) => {
  Promise.reject(error)
})
