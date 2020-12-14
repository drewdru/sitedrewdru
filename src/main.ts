import Vue from 'vue';
import App from '@/App.vue';
import '@/filters';

import {routers, subdomains} from '@/router';

import apolloProvider from '@/vue-apollo';
import store from '@/store';
import {i18n} from '@/plugins/i18n';

import FlagIcon from 'vue-flag-icon';
import VueShortKey from 'vue-shortkey';
import uiVueSelect from 'ui-vue-select';

Vue.use(FlagIcon);
Vue.use(VueShortKey);
Vue.use(uiVueSelect);

Vue.config.productionTip = false;

const routerData = routers();
store.state.subdomain = routerData.subdomain;
store.state.subdomains = subdomains;
// TODO: Get User core data (refresh token if exist)
// set language and theme
// save token to httpOnly cookies for use with subdomains?
// Проверить наличие httpOnly cookies, если отсутствует, проверить в локальном хранилище, если есть - обновить, иначе запросить новый uid.  
// uid:"UID" Created:"DATE" Domain:".drewdru.com" Expires / Max-Age:"DATE" HttpOnly:true Last Accessed:"DATE" Path:"/" SameSite:"Strict" Secure:true Size:51

(document as any).domain = process.env.VUE_APP_DOMAIN_NAME;

new Vue({
  i18n,
  store,
  apolloProvider,
  uiVueSelect,
  router: routerData.routes,
  render: (h) => h(App),
}).$mount('#app');
