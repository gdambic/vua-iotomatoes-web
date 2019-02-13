import Vue from "vue";
import axios from "axios";
import app from "../main";
import { HttpStatusCode } from "./constants";

const instance = axios.create({
  // Proxy table webpackDevServer property inside config folder index.js proxies our request to .NET Core server
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(config => {
  app.$Progress.start();
  return config;
});

instance.interceptors.response.use(
  response => {
    app.$Progress.finish();
    return response;
  },
  error => {
    app.$Progress.fail();

    if (
      error.status === HttpStatusCode.UNAUTHORIZED &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      app.$store.dispatch("logout");
    }

    throw error;
  }
);

export const Api = {
  // User API
  loginUser: user => instance.post("/users/login", user),
  updateUser: user => instance.put("/users", user),
  createUser: user => instance.post("/users", user),
  getFarmsForUser: id => instance.get(`/users/${id}/farms`),

  // Farm API
  createFarm: farm => instance.post("/farms", farm),

  // SensorMeasurment API
  getFarmMeasurements: params => instance.get('/sensorMeasurements', { params })
};

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$api", {
      get() {
        return Api;
      }
    });
  }
};
