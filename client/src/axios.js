import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://guitar-trainer.herokuapp.com/api/'
});

export const authInstance = axios.create({
  baseURL: 'https://guitar-trainer.herokuapp.com/api/auth'
});
