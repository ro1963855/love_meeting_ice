import Vue from 'vue';
import Vuex from 'vuex';
import menu from './modules/menu';
import order from './modules/order';
import bill from './modules/bill';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu,
    order,
    bill,
  },
});
