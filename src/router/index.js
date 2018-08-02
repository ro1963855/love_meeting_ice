import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import Order from '@/pages/Order';
import Bill from '@/pages/Bill';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
    },
    {
      path: '/bill',
      name: 'Bill',
      component: Bill,
    },
    {
      path: '*',
      redirect: '/login',
    },
  ],
});
