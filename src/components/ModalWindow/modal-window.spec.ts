import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import store from '@/store';

import ModalWindow from './modal-window';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ModalWindow.vue', () => {
  it('renders props.msg when passed', () => {
    // const msg = 'new message';
    // const wrapper = shallowMount(ModalWindow, {
    //   store,
    //   localVue,
    //   propsData: { msg },
    // });
    // expect(wrapper.text()).toMatch(msg);
  });
});
