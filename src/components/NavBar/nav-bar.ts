import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import LocaleChanger from '@/components/LocaleChanger/LocaleChanger.vue';
import ThemeChanger from '@/components/ThemeChanger/ThemeChanger.vue';

@Component({
  components: {
    LocaleChanger,
    ThemeChanger,
  },
})
export default class NavBar extends Vue {
  // @State private theme!: any;
  // @Prop() private msg!: string;
}
