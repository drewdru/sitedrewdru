import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import store from '@/store';

import SignIn from './sign-in';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('SignIn.vue', () => {
  it('change theme', () => {
    // const wrapper = shallowMount(SignIn, {
    //   store,
    //   localVue,
    // });
    // wrapper.findAll('option').at(0).trigger('click')

    // expect(localVue.i18n.locale).toMatch(selected.locale);
  });
});
