import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

@Component({
  components: {
  },
})
export default class Auth extends Vue {
  @State private user!: any;

  private created() {
    // TODO: if user then redirect
    // window.location.href = this.$route.query.next;
  }
}
