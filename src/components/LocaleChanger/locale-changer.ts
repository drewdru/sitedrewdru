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

  private selected: Languages|any = {};

  private created() {
    this.selected = this.languages.filter(
      (c) => c.locale === this.$i18n.locale,
    )[0];
  }

  @Emit()
  private localeChange() {
    // TODO: cache $i18n
    this.$i18n.locale = this.selected.locale;
  }
}
