import { Component, Emit, Vue } from 'vue-property-decorator';

import {ILanguages, LANGUAGES} from '@/constants/languages';



@Component
export default class LocaleChanger extends Vue {
  private languages: ILanguages[] = LANGUAGES;

  private selected: ILanguages|any = {};

  private created() {
    this.selected = this.languages.filter(
      (c) => c.locale === this.$i18n.locale,
    )[0];
  }

  @Emit()
  private localeChange() {
    this.$i18n.locale = this.selected.locale;
    localStorage.setItem('language', this.selected.locale);
  }
}
