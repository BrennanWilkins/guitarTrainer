import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://guitar-trainer.herokuapp.com/api/'
  // baseURL: 'http://localhost:9000/api/'
});

export const authInstance = axios.create({
  baseURL: 'https://guitar-trainer.herokuapp.com/api/auth'
  // baseURL: 'http://localhost:9000/api/auth'
});
