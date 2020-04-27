import { Component, Emit, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { themes } from '@/constants/themes';
import ModalWindow from '@/components/ModalWindow/ModalWindow.vue';

@Component({
  components: {
    ModalWindow,
  },
})
export default class ThemeChanger extends Vue {
  @State private theme!: any;
  @Mutation private switchTheme: any;

  private selected: any = {};
  private themes: any = themes;
  private isOpen: boolean = false;
  private isFocus: boolean = false;
  private isCustomize: boolean = false;

  private created() {
    this.selected = this.theme;
  }

  @Emit()
  private open(event: any) {
    this.isOpen = true;
  }

  @Emit()
  private close(event: any) {
    this.isOpen = false;
  }

  @Emit()
  private themeChange(event: any, themeName: string) {
    if (themeName == 'customTheme') {
      this.switchTheme(JSON.parse(localStorage.getItem('customTheme')||'{}'));
    } else {
      this.switchTheme(this.themes[themeName]);
    }
    localStorage.setItem('theme', themeName);
  }
  
  @Emit()
  private saveCustomTheme(event: any) {
    this.theme.themeName = 'customTheme';
    this.switchTheme(this.theme);
    localStorage.setItem('theme', 'customTheme');
    localStorage.setItem('customTheme', JSON.stringify(this.theme));
  }
}
