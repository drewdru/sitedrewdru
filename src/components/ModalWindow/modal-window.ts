import { Component, Prop, Vue, Provide, Emit } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class ModalWindow extends Vue {
  @Prop({ default: true }) private isHeader!: boolean;
  @Prop({ default: true })  private isBody!: boolean;
  @Prop({ default: false })  private isFooter!: boolean;
}
