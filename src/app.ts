import { Component, Vue } from 'vue-property-decorator';

import LocaleChanger from '@/components/LocaleChanger/LocaleChanger.vue';

@Component({
  components: {
    LocaleChanger,
  },
})
export default class App extends Vue {}
