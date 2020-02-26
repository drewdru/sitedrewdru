import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import NavBar from '@/components/NavBar/NavBar.vue';

@Component({
  components: {
    NavBar,
  },
})
export default class App extends Vue {
  @State private theme!: any;
  
  created() {
      document.body.style.backgroundColor = this.theme.body;
  }
}
