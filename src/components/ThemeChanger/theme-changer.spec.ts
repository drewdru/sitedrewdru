import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import store from '@/store';

import LocaleChanger from './theme-changer';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ThemeChanger.vue', () => {
  it('change theme', () => {
    // const wrapper = shallowMount(LocaleChanger, {
    //   store,
    //   localVue,
    // });
    // wrapper.findAll('option').at(0).trigger('click')

    // expect(localVue.i18n.locale).toMatch(selected.locale);
  });
});
