import { Component, Emit, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { THEMES } from '@/constants/themes';

@Component
export default class ThemeChanger extends Vue {
  @Mutation private switchTheme: any;
  // public languages = [
  //   {locale: 'en', flag: 'us', title: 'English'},
  //   {locale: 'ru', flag: 'ru', title: 'Russian'},
  // ];
  private selected: any = {};
  private flag: string = '';

  @Emit()
  private themeChange(event: any) {
    // TODO: cache theme
    this.switchTheme(THEMES.red);
  }
}
