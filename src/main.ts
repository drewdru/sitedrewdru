import Vue from 'vue';
import FlagIcon from 'vue-flag-icon';
import vSelect from 'vue-select';

import App from './App.vue';
import router_index from './router';
import router_test from './router.test';
import router_error from './router.error';
import store from './store';
import {i18n} from '@/plugins/i18n';
import FontAwesomeIcon from '@/plugins/FontAwesomeIcon';

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.component('v-select', vSelect);

Vue.use(FlagIcon);


Vue.config.productionTip = false;


const host = window.location.host;
const parts = host.split('.');

const router = () => {
  let routes;
  if (parts.length === 2 || parts[0] === 'www') {
    routes = router_index;
  } else if (parts.length === 3) {
    switch (parts[0]) {
      case 'test':
        routes = router_test;
        break;
      default:
        routes = router_error;
        break;
    }
  } else {
    // If you want to do something else just comment the line below
    routes = router_error;
  }
  return routes;
};

new Vue({
  i18n,
  store,
  router: router(),
  render: (h) => h(App),
}).$mount('#app');
