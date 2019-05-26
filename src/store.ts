import Vue from 'vue';
import Vuex from 'vuex';
import { themes, defaultTheme } from '@/constants/themes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: defaultTheme,
  },
  mutations: {
    switchTheme(state, themeName) {
      state.theme = themes[themeName];
    },
  },
  actions: {},
});
