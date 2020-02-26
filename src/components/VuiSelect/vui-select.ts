import TsElement from 'ts-element';
import { Component, Model, Prop, Provide, Emit, Vue } from 'vue-property-decorator';

@Component
export default class VuiSelect extends Vue {
  public isOpened: boolean = false;
  
  @Prop() public id!: string;
  @Prop() public label!: string;
  @Prop() public value!: string;

  @Prop() public items!: any;
  get searchItems() {
    return this.searchFilter(this.items);
  }
  set searchItems(item) {}

  @Prop() public search!: string;
  get searchText() {
    return this.search;
  }
  set searchText(item) {}

  @Prop() public searchKeys!: Array<string>;


  @Prop() public required!: boolean;
  get isRequired() {
    return this.required;
  }
  set isRequired(item) {}
  

  @Provide() public selected: any = {};

  private fetchFromObject = (obj: any, prop: string): any  => {
    if(typeof obj === 'undefined') {
      return false;
    }
    var _index = prop.indexOf('.')
    if(_index > -1) {
      return this.fetchFromObject(
        obj[prop.substring(0, _index)],
        prop.substr(_index + 1)
      );
    }
    return obj[prop];
  }
  @Provide() public searchFilter: Function = (items: any) => {
    let result = items;
    if (!this.searchText)
      return result

    const filterValue = this.searchText.toLowerCase()

    const filter = (item: any) => {
      if (item === null || item === undefined) {
        return false;
      }
      if (typeof item == 'object') {
        for(let i = 0; i < this.searchKeys.length; ++i) {
          let searchValue = this.fetchFromObject(item, this.searchKeys[i]);
          if (searchValue && searchValue.toString().toLowerCase().includes(filterValue)) {
            return true;
          }
        }
        return false;
      }
      return item.toString().toLowerCase().includes(filterValue);
    }
    return result.filter(filter);
  };

  private mounted() {
    if (
      this.required
      && this.items.length > 0
      && Object.keys(this.selected).length === 0
    ) {
      console.log('BBBBBBBBBBBBBBBBBBBBB');
      this.selected = this.items[0];
    }
  }
  
  @Emit()
  public selectItem(item: any) {
    this.selected = item;
    this.isOpened = false;
  }
  
  @Emit()
  public openSelect() {
    this.isOpened = !this.isOpened;
    this.$nextTick(() => {
      // @ts-ignore
      this.$refs.selectSearch.focus();
    });
  }
  
  @Emit()
  public onSearch(event: any) {
    this.searchText = event.target.value;
    this.$nextTick(() => {
      this.searchItems = this.searchFilter(this.items);
    });
  }
}
