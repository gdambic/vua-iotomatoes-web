import axios from "axios";
import app from "../main";

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(config => {
  console.log(app.$Progress)
  app.$Progress.start();
  return config;
});

instance.interceptors.response.use(response => {
  app.$Progress.finish();
  return response;
}, error => {
  app.$Progress.fail();
  return Promise.reject(error);
});

export default {
  // User API
  login: user => instance.post("/users/login", user)
}

