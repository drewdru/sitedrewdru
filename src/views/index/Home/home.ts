import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

import HelloWorld from '@/components/HelloWorld/HelloWorld.vue';



@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
}
