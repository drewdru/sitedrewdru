import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import store from '@/store';

import HelloWorld from './hello-world';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    // const msg = 'new message';
    // const wrapper = shallowMount(HelloWorld, {
    //   store,
    //   localVue,
    //   propsData: { msg },
    // });
    // expect(wrapper.text()).toMatch(msg);
  });
});
