import axios from "axios";
import app from "../main";
import { HttpStatusCode } from "./constants";

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(config => {
  app.$Progress.start();
  return config;
});

instance.interceptors.response.use(response => {
  app.$Progress.finish();
  return response;
}, error => {
  app.$Progress.fail();

  if (error.status === HttpStatusCode.UNAUTHORIZED &&
    error.config && !error.config.__isRetryRequest) {
    app.$store.dispatch('logout');
  }

  throw error;
});

export default {
  // User API
  login: user => instance.post("/users/login", user),
  update: user => instance.put("/users", user),
  create: user => instance.post("/users", user)
}

