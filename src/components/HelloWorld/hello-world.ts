import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class HelloWorld extends Vue {
  @State private theme!: any;
  @Prop() private msg!: string;
}
