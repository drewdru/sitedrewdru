import { Component, Vue } from 'vue-property-decorator';

import LocaleChanger from '@/components/LocaleChanger/LocaleChanger.vue';
import ThemeChanger from '@/components/ThemeChanger/ThemeChanger.vue';

@Component({
  components: {
    LocaleChanger,
    ThemeChanger,
  },
})
export default class App extends Vue {}
