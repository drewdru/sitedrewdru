import type { RouteRecordRaw } from "vue-router";

interface MenuTreeData {
  name: string;
  path: string;
}

interface MenuTree {
  data?: MenuTreeData;
  level?: number;
  [key: string]: number | MenuTreeData | MenuTree | null;
}

export class MenuLinks {
  menuTree?: MenuTree = {};

  constructor() {
    const router = useRouter();
    const subdomain = useSubdomain();
    const routes = this.getAvailibleRoutes(
      subdomain.value,
      router.options.routes
    );

    routes.forEach((element) => {
      let path = element.path;
      if (subdomain.value) {
        path = path.replace(`/${subdomain.value}`, "");
      }
      const links = path.slice(1).split("/");
      this.setMenuData(links, {
        level: links.length,
        data: {
          name: element.name as string,
          path: element.path as string,
        },
      });
    });
  }

  public getAvailibleRoutes(
    subdomain: string,
    routes: RouteRecordRaw[]
  ): RouteRecordRaw[] {
    const config = useRuntimeConfig();
    let result = [];
    if (subdomain) {
      result = routes.filter(
        (item) =>
          item.path !== "/" &&
          (item.name as string).startsWith(`${subdomain}-`) &&
          !(item.name as string).endsWith("-index")
      );
    } else {
      result = routes.filter(
        (item) =>
          item.path !== "/" &&
          !config.VITE_SUBDOMAINS.some(
            (subdomain) =>
              subdomain.name === (item.name as string).split("-")[0]
          ) &&
          !(item.name as string).endsWith("-index")
      );
    }
    // TODO: filter any specific routes
    // result = result.filter((item) => item.path !== "/api-docs");
    // TODO: filter unavailible routes
    // result = result.filter(item => (
    //   item.meta?.middleware
    //   && item.meta?.middleware === undefined
    // ))
    return result;
  }

  public getNextLevel(data: MenuTree): MenuTree {
    const nextLevel = Object.assign({}, data);
    delete nextLevel.data;
    delete nextLevel.level;
    return nextLevel;
  }

  private setMenuData = (links: string[], value: MenuTree) => {
    let schema: MenuTree = this.menuTree;
    const pList = links;
    const len = pList.length;
    for (let i = 0; i < len - 1; i++) {
      const elem = pList[i];
      if (!schema[elem]) {
        schema[elem] = {};
        continue;
      }
      schema = schema[elem] as MenuTree;
    }
    schema[pList[len - 1]] = value;
  };
}
