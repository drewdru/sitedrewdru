import type { RouteRecordRaw } from 'vue-router';

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

  constructor(routes: RouteRecordRaw[]) {
    routes.forEach((element) => {
      if (element.path === '/' || element.path === '*') {
        return;
      }
      const links = element.path.slice(1).split('/');
      this.setMenuData(links, {level: links.length, data: {
        name: element.name as string,
        path: element.path as string,
      }});
    })
  }

  public getNextLevel(data: MenuTree) : MenuTree {
    const nextLevel = Object.assign({}, data)
    delete nextLevel.data
    delete nextLevel.level
    return nextLevel
  }

  private setMenuData = (links: string[], value: MenuTree) => {
    let schema: MenuTree = this.menuTree
    const pList = links
    const len = pList.length
    for (let i = 0; i < len - 1; i++) {
        const elem = pList[i]
        if (!schema[elem]) {
          schema[elem] = {}
          continue
        }
        schema = schema[elem] as MenuTree
    }
    schema[pList[len - 1]] = value;
  }
}