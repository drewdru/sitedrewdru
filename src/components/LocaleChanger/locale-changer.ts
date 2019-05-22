import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
export default class LocaleChanger extends Vue {
  public languages = [
    {locale: 'en', flag: 'us', title: 'English'},
    {locale: 'ru', flag: 'ru', title: 'Russian'},
  ];
  public selected: any = {};
  // public selected: Language = this.languages.filter(
  //   (c) => c.locale === $i18n.locale,
  // )[0];
  public flag: string = '';

  @Emit()
  public localeChange(event: any) {
    // TODO: cache $i18n
    this.$i18n.locale = this.selected.locale;
    this.flag = this.selected.flag;
  }
}
