import { Component, Emit, Vue } from 'vue-property-decorator';

interface Languages {
  locale: string;
  flag: string;
  title: string;
}

@Component
export default class LocaleChanger extends Vue {
  private languages: Languages[] = [
    {locale: 'en', flag: 'us', title: 'English'},
    {locale: 'ru', flag: 'ru', title: 'Russian'},
  ];

  get selected() {
    // this.localeChange({});
    return this.languages.filter(
      (c) => c.locale === this.$i18n.locale,
    )[0];
  }

  get flag() {
    return this.selected.flag;
  }

  private created() {
    this.localeChange();
  }

  @Emit()
  private localeChange() {
    // TODO: cache $i18n
    this.$i18n.locale = this.selected.locale;
  }
}
