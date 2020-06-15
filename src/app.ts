import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import NavBar from '@/components/NavBar/NavBar.vue';

import axios from 'axios';

const HTTP = axios.create({
  baseURL: `${process.env.VUE_APP_REST_URL}`,
})

@Component({
  components: {
    NavBar,
  },
})
export default class App extends Vue {
  @State private theme!: any;
  private isTabbing: boolean = false;

  private async mounted() {
    const response: any = await HTTP.post(`session/`, {
      username: '',
      password: '',
    });
    console.log(response);
    HTTP.defaults.headers.common['Authorization'] = `JWT ${response.data.token}`;
    const user: any = await HTTP.get(`user/`,);
    const auth: any = await HTTP.post(`authorize/`,);
    
  }

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
