import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

Vue.use(Vuex);

// modules
import auth from './modules/auth';

const isProduction = process.env.NODE_ENV === "production";
const expiresInTwoHours = new Date(Date.now() + 7200000)

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['auth'],
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: expiresInTwoHours, secure: false }),
      removeItem: key => Cookies.remove(key)
    }
  })],
  modules: {
    auth
  },
  strict: isProduction
});