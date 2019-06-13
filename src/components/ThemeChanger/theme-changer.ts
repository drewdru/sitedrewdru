import { Component, Emit, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { themes } from '@/constants/themes';

@Component
export default class ThemeChanger extends Vue {
  @State private theme!: any;
  @Mutation private switchTheme: any;

  private selected: any = {};
  private themes: any = themes;

  private options: any = [
    {
        title: 'Read the Docs',
        icon: 'spinner',
        url: 'https://codeclimate.com/github/sagalbot/vue-select',
      },
      // {
      //   title: 'View on GitHub',
      //   icon: 'fa-github',
      //   url: 'https://codeclimate.com/github/sagalbot/vue-select',
      // },
      // {
      //   title: 'View on NPM',
      //   icon: 'fa-database',
      //   url: 'https://codeclimate.com/github/sagalbot/vue-select',
      // },
      // {
      //   title: 'View Codepen Examples',
      //   icon: 'fa-pencil',
      //   url: 'https://codeclimate.com/github/sagalbot/vue-select',
      // },
  ];


  private created() {
    this.selected = this.theme;
  }

  @Emit()
  private themeChange(event: any) {
    // TODO: cache theme
    this.switchTheme(this.selected.themeName);
  }
}
