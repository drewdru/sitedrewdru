import { Component, Emit, Vue } from 'vue-property-decorator';

import {ILanguages, LANGUAGES} from '@/constants/languages';


@Component
export default class LocaleChanger extends Vue {
  private languages: ILanguages[] = LANGUAGES;

  @Emit()
  private localeChange(locale: string) {
    this.$i18n.locale = locale;
    localStorage.setItem('language', locale);
    this.$forceUpdate();
    this.close();
  }

  @Emit()
  private close() {
    (this.$refs.localeChanger as Element).removeAttribute("open");
  }
}
