import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes';
import store from '../store';

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters.isAuthenticated;
    if (isAuthenticated) {
      return next()
    }
    
    next('/login') 
  } else {
    next()
  }
})

export default router;