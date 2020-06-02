import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
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
  @State private subdomains!: any;
  @State private subdomain!: any;
  private menuLinks: any = {};

  created() {
    ((this.$router as any).options.routes as Array<any>).forEach(element => {
      if (element.path == '/' || element.path == '*') {
        return;
      }
      let links = element.path.slice(1).split('/');
      this.setMenu(links, {level: links.length, data: {
        name: element.name,
        path: element.path,
      }});
    });
  }

  @Emit()
  private getNextLevel(data:any) {
    let nextLevel = Object.assign({}, data);
    delete nextLevel.data;
    delete nextLevel.level;
    return nextLevel;
  }

  @Emit()
  private setMenu(links:string, value:any) {
      var schema = this.menuLinks;  // a moving reference to internal objects within obj
      var pList = links;
      var len = pList.length;
      for(var i = 0; i < len-1; i++) {
          var elem = pList[i];
          if( !schema[elem] ) schema[elem] = {}
          schema = schema[elem];
      }

      schema[pList[len-1]] = value;
  }
}
