import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:9000/api/'
});

export const authInstance = axios.create({
  baseURL: 'http://localhost:9000/api/auth/'
});
