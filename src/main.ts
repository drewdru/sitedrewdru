import Vue from 'vue';
import FlagIcon from 'vue-flag-icon';
import vSelect from 'vue-select';

import App from '@/App.vue';
import router from '@/router';

import apolloProvider from '@/vue-apollo';
import store from '@/store';
import {i18n} from '@/plugins/i18n';
import FontAwesomeIcon from '@/plugins/FontAwesomeIcon';
import VueShortKey from 'vue-shortkey';
import uiVueSelect from 'ui-vue-select';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('v-select', vSelect);

Vue.use(FlagIcon);
Vue.use(VueShortKey);
Vue.use(uiVueSelect);

Vue.config.productionTip = false;

Vue.filter('capitalize', function (value: string) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  i18n,
  store,
  apolloProvider,
  uiVueSelect,
  router: router(),
  render: (h) => h(App),
}).$mount('#app');
