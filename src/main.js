// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import VueSession from 'vue-session';
import VueDragscroll from 'vue-dragscroll';
import VueLodash from 'vue-lodash';
import * as moment from 'moment';
import VCalendar from 'v-calendar';
import Buefy from 'buefy';
import VueHighcharts from 'vue-highcharts';
import 'v-calendar/lib/v-calendar.min.css';
import './assets/stylesheet/build/all.min.css';
import App from './App';
import router from './router';
import store from './store/index';

library.add(fas);
library.add(far);
library.add(fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(VueSession, { persist: true });
Vue.use(VueDragscroll);
Vue.use(VueLodash);
Vue.use(Buefy);
Vue.use(VueHighcharts);
Vue.use(VCalendar, {
  firstDayOfWeek: 2, // Monday
  // popoverVisibility: 'focus',
});
Vue.config.productionTip = false;

moment.locale('zh-tw');
Vue.prototype.$moment = moment;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
