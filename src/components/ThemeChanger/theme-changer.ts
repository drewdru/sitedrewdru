import { Component, Emit, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { themes } from '@/constants/themes';

@Component
export default class ThemeChanger extends Vue {
  @State private theme!: any;
  @Mutation private switchTheme: any;

  private selected: any = {};
  private themes: any = themes;
  private themeChangerModal: boolean = false;

  private created() {
    this.selected = this.theme;
  }

  @Emit()
  private themeChange(event: any, themeName: string) {
    this.switchTheme(themeName);
    localStorage.setItem('theme', themeName);
  }

  @Emit()
  private openThemeChangerModal(event: any) {
    this.themeChangerModal = true;
  }
  @Emit()
  private closeThemeChangerModal(event: any) {
    this.themeChangerModal = false;
  }
}
