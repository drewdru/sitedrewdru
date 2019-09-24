import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class Modal extends Vue {
  @State private theme!: any;
  @Prop() private title!: string;
  @Prop() private footer!: string;
}
