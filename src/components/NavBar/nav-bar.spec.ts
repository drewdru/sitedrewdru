import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import store from '@/store';

import NavBar from './nav-bar';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('NavBar.vue', () => {
  it('renders props.msg when passed', () => {
    // const msg = 'new message';
    // const wrapper = shallowMount(NavBar, {
    //   store,
    //   localVue,
    //   propsData: { msg },
    // });
    // expect(wrapper.text()).toMatch(msg);
  });
});
