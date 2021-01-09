import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import LocaleChanger from '@/components/LocaleChanger/LocaleChanger.vue';
import SignIn from '@/components/SignIn/SignIn.vue';
import ThemeChanger from '@/components/ThemeChanger/ThemeChanger.vue';
import SideBar from '@/components/SideBar/SideBar.vue';

@Component({
  components: {
    LocaleChanger,
    SignIn,
    ThemeChanger,
    SideBar,
  },
})
export default class NavBar extends Vue {
  @State private subdomains!: any;
  @State private subdomain!: any;
  private menuLinks: any = {};
  private domainName: any = `//${process.env.VUE_APP_DOMAIN_NAME}`;
  private isSideBar: boolean = false;

  private created() {
    ((this.$router as any).options.routes as any[]).forEach((element) => {
      if (element.path === '/' || element.path === '*') {
        return;
      }
      const links = element.path.slice(1).split('/');
      this.setMenu(links, {level: links.length, data: {
        name: element.name,
        path: element.path,
      }});
    });
  }

  @Emit()
  private getNextLevel(data: any) {
    const nextLevel = Object.assign({}, data);
    delete nextLevel.data;
    delete nextLevel.level;
    return nextLevel;
  }

  @Emit()
  private setMenu(links: string, value: any) {
      let schema = this.menuLinks;  // a moving reference to internal objects within obj
      const pList = links;
      const len = pList.length;
      for (let i = 0; i < len - 1; i++) {
          const elem = pList[i];
          if (!schema[elem]) {
            schema[elem] = {};
          }
          schema = schema[elem];
      }
      schema[pList[len - 1]] = value;
  }
}
