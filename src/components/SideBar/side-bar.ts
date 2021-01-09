import { Component, Prop, Emit, Vue, Model } from 'vue-property-decorator';
@Component({
  components: {
  },
})
export default class SideBar extends Vue {
  @Model('change', { type: Boolean }) public readonly isOpen!: boolean;

  get isSideBar(): boolean {
    return this.isOpen;
  }

  set isSideBar(value: boolean) {
    this.$emit('change', value);
  }

  // private computed() {
  //   checkedValue: {
  //     get() {
  //       return this.checked
  //     },
  //     set(value) {
  //       this.$emit('change', value)
  //     },
  //   },
  // },
  // @Model('checked', 'change', { type: Boolean }) readonly isSideBar!: boolean;
}
