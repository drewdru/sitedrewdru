import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import store from '@/store';

import Modal from './modal';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Modal.vue', () => {
  it('renders props.msg when passed', () => {
    // const msg = 'new message';
    // const wrapper = shallowMount(Modal, {
    //   store,
    //   localVue,
    //   propsData: { msg },
    // });
    // expect(wrapper.text()).toMatch(msg);
  });
});
