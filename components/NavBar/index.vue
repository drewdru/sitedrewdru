<i18n locale="en" lang="yaml" src="./en.yml" />
<i18n locale="ru" lang="yaml" src="./ru.yml" />

<template>
  <div class="navbar">
    <div class="nav static"></div>
    <div id="nav" class="nav fixed" ref="nav">
      <a class="logo" :href="domainName">
        <div class="logo-wrapper">
          <img class="logo" :alt="t('LogoAlt')" src="@/assets/logo.svg">
        </div>
      </a>

      <div class="routes-list">
        <div class="first-level">
          <router-link class="link home" to="/">
            {{t('Home')}}
          </router-link>
        </div>
      </div>
      <!-- <ClientOnly>
      </ClientOnly> -->
      <div v-for="(value1, key1) in menuLinks" :key="key1" class="routes-list">
        <div class="first-level">
          <router-link :to="value1.data.path" class="link">{{$t(value1.data.name)}}</router-link>
          <div class="second-level">
            <router-link v-for="(value2, key2) in getNextLevel(value1)"
              :key="key2" :to="value2.data.path" class="link">
              {{$t(value2.data.name)}}
              <!-- <div class="third-level">
                <router-link v-for="(value3, key3) in getNextLevel(value2)"
                  :key="key3" :to="value3.data.path" class="link">{{$t(value3.data.name)}}
                </router-link>
              </div> -->
            </router-link>
          </div>
        </div>
      </div>

      <!--
      <div class="routes-list">
        <div class="first-level">
          <a class="link">{{$t('ToKnowMore')}}</a>
          <div class="second-level">
            <a v-for="(value, key) in subdomains"
              :key="key" :href="value.path" class="link">{{$t(value.name)}}
            </a>
          </div>
        </div>
      </div>
      <SignIn v-if="$route.name != 'auth'"></SignIn>
      <ThemeChanger></ThemeChanger>
      <LocaleChanger></LocaleChanger>
      -->
      <div class="spacer"></div>
      <SwitchLocale></SwitchLocale>
      <SwitchLocaleSelect></SwitchLocaleSelect>
      
      <!--
      <a class="burger link" @click="isSideBar=true">&#9776;</a>
      -->
    </div>

    <!--
    <SideBar v-model="isSideBar">
      <a class="logo link" :href="domainName">
        <div class="logo-wrapper">
          <img class="logo" alt="Drew Dru logo" src="@/assets/logo.svg">
        </div>
        Drew Dru
      </a>
      <div class="changers">
        <SignIn v-if="$route.name != 'auth'"></SignIn>
        <ThemeChanger></ThemeChanger>
        <LocaleChanger></LocaleChanger>
      </div>

      <div class="routes-list">
        <div class="first-level">
          <router-link class="link home" to="/">
            {{$t('Home')}}
          </router-link>
        </div>
      </div>
      
      <div v-for="(value1, key1) in menuLinks" :key="key1" class="routes-list">
        <div class="first-level">
          <router-link :to="value1.data.path" class="link">{{$t(value1.data.name)}}</router-link>
          <div class="second-level">
            <router-link v-for="(value2, key2) in getNextLevel(value1)"
              :key="key2" :to="value2.data.path" class="link">{{$t(value2.data.name)}}
            </router-link>
          </div>
        </div>
      </div>

      <details>
        <summary>
          {{$t('ToKnowMore')}}
        </summary>
        <div class="details-menu">
          <a v-for="(value, key) in subdomains"
            :key="key" :href="value.path" class="link">{{$t(value.name)}}
          </a>
        </div>
      </details>
    </SideBar>
    -->
  </div>
</template>

<style scoped lang="less" src="./nav-bar.less"></style>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const {t, locale} = useI18n();
const router: any = useRouter()

const config = useRuntimeConfig()

let menuLinks: any = {};
const domainName: string = `//${config.VITE_DOMAIN_NAME}`;

// console.log('config:', config, config.VITE_DOMAIN_NAME)
// onMounted(() => {
//   console.log(menuLinks)
//   // router.options.routes.forEach((element) => {
//   //   if (element.path === '/' || element.path === '*') {
//   //     return;
//   //   }
//   //   const links = element.path.slice(1).split('/');
//   //   setMenu(links, {level: links.length, data: {
//   //     name: element.name,
//   //     path: element.path,
//   //   }});
//   // });
// })

const getNextLevel = (data: any) => {
    const nextLevel = Object.assign({}, data);
    delete nextLevel.data;
    delete nextLevel.level;
    return nextLevel;
  }

const setMenu = (links: string, value: any) => {
  let schema = menuLinks;  // a moving reference to internal objects within obj
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

router.options.routes.forEach((element) => {
  if (element.path === '/' || element.path === '*') {
    return;
  }
  const links = element.path.slice(1).split('/');
  setMenu(links, {level: links.length, data: {
    name: element.name,
    path: element.path,
  }});
});
</script>
