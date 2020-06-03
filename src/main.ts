import Vue from 'vue';
import FlagIcon from 'vue-flag-icon';

import App from '@/App.vue';
import {routers, subdomains} from '@/router';

import apolloProvider from '@/vue-apollo';
import store from '@/store';
import {i18n} from '@/plugins/i18n';
import VueShortKey from 'vue-shortkey';
import uiVueSelect from 'ui-vue-select';

Vue.use(FlagIcon);
Vue.use(VueShortKey);
Vue.use(uiVueSelect);

Vue.config.productionTip = false;

Vue.filter('capitalize', (value: string) => {
  if (!value) {
    return '';
  }
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

const routerData = routers();
store.state.subdomain = routerData.subdomain;
store.state.subdomains = subdomains;

new Vue({
  i18n,
  store,
  apolloProvider,
  uiVueSelect,
  router: routerData.routes,
  render: (h) => h(App),
}).$mount('#app');
