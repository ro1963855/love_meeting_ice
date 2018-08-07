import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import Order from '@/pages/Casher/Order';
import Bill from '@/pages/Casher/Bill';
import DailyChart from '@/pages/Chart/DailyChart';
import IncomeChart from '@/pages/Chart/IncomeChart';
import HotTimeChart from '@/pages/Chart/HotTimeChart';
import HotProductChart from '@/pages/Chart/HotProductChart';

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
      path: '/dailyChart',
      name: 'DailyChart',
      component: DailyChart,
    },
    {
      path: '/incomeChart',
      name: 'IncomeChart',
      component: IncomeChart,
    },
    {
      path: '/hotTimeChart',
      name: 'HotTimeChart',
      component: HotTimeChart,
    },
    {
      path: '/hotProductChart',
      name: 'HotProductChart',
      component: HotProductChart,
    },
    {
      path: '*',
      redirect: '/login',
    },
  ],
});
