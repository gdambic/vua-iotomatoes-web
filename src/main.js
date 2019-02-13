import Vue from 'vue'
import vClickOutside from 'v-click-outside'

// Plugins
import GlobalComponents from './gloablComponents'
import SideBar from './components/UIComponents/SidebarPlugin'
import VueProgressBar from 'vue-progressbar'
import Notifications from "vue-notification";
import Alert from "./utils/alert";
import App from './App'

// store and router
import router from './router';
import store from './store';

// library imports
import Chartist from 'chartist'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'

const options = {
  color: '#28a745',
  failedColor: '#dc3545',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

// plugin setup
Vue.use(VueProgressBar, options)
Vue.use(Notifications);
Vue.use(GlobalComponents)
Vue.use(vClickOutside)
Vue.use(SideBar)
Vue.use(Alert);

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get() {
    return this.$root.Chartist
  }
})

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  },
})
