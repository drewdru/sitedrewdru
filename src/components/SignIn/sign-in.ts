import { Component, Emit, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { themes } from '@/constants/themes';
import ModalWindow from '@/components/ModalWindow/ModalWindow.vue';

@Component({
  components: {
    ModalWindow,
  },
})
export default class SignIn extends Vue {
  @State private user!: any;
  @State private theme!: any;
  @Mutation private switchTheme: any;

  private selected: any = {};
  private themes: any = themes;
  private isOpen: boolean = false;
  private isFocus: boolean = false;
  private isCustomize: boolean = false;
  private signInLink: string = `//${process.env.VUE_APP_DOMAIN_NAME}/auth/?next=${window.location.href}`;

  private created() {
    this.selected = this.theme;
  }

  @Emit()
  private open(event: any) {
    if (this.user) {
      // TODO: Go to user profile (open user menu?)
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  @Emit()
  private close(event: any) {
    this.isOpen = false;
  }
  
}
