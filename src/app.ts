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
  private isTabbing: boolean = false;

  private created() {
      document.body.style.backgroundColor = this.theme.body;
      window.addEventListener('keydown', this.handleFirstTab);
  }

  private handleFirstTab(e: any) {
    if (e.keyCode === 9) {
      this.isTabbing = true;
      window.removeEventListener('keydown', this.handleFirstTab);
      window.addEventListener('mousedown', this.handleMouseDownOnce);
    }
  }
  private handleMouseDownOnce() {
    this.isTabbing = false;
    window.removeEventListener('mousedown', this.handleMouseDownOnce);
    window.addEventListener('keydown', this.handleFirstTab);
  }
}
