import Vue from 'vue';
import Vuex from 'vuex';
import { defaultTheme } from '@/constants/themes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: defaultTheme,
  },
  mutations: {
    switchTheme(state, theme) {
      state.theme = theme;
      document.body.style.backgroundColor = state.theme.body;
    },
  },
  actions: {},
});
