import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Career extends Vue {
  get experience() {
    const now = new Date();
    return now.getUTCFullYear() - 2017;
  }
}
