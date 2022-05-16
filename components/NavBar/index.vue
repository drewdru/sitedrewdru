<i18n locale="en" lang="yaml" src="./en.yml" />
<i18n locale="ru" lang="yaml" src="./ru.yml" />

<template>
  <div class="navbar">
    <div class="nav static"></div>
    <div id="nav" class="nav fixed" ref="nav">
      <a class="logo" :href="domainPath">
        <div class="logo-wrapper">
          <img class="logo" :alt="t('LogoAlt')" src="@/assets/logo.svg">
        </div>
      </a>

      <div class="routes-list">
        <div class="first-level">
          <router-link class="link home" :to="subdomain ? `/${subdomain}` : '/'">
            {{t('Home')}}
          </router-link>
        </div>
      </div>
      
      <div v-for="(value1, key1) in menuLinks.menuTree" :key="key1" class="routes-list">
        <div class="first-level">
          <router-link
            :to="value1.data.path" class="link"
            :class="{'router-link-active': $route.path.includes(value1.data.path)}"
          >
            {{$t(value1.data.name)}}
          </router-link>
          <div class="second-level">
            <router-link v-for="(value2, key2) in menuLinks.getNextLevel(value1)"
              :key="key2"
              :to="value2.data.path"
              class="link"
              :class="{'router-link-active': checkLevel2ChildActive($route.path.replace(value2.data.path).split('/'))}"
            >
              {{$t(value2.data.name)}}
              <div class="third-level">
                <router-link v-for="(value3, key3) in menuLinks.getNextLevel(value2)"
                  :key="key3" :to="value3.data.path" class="link">{{$t(value3.data.name)}}
                </router-link>
              </div>
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
      <a class="logo link" :href="domainPath">
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
            <router-link v-for="(value2, key2) in menuLinks.getNextLevel(value1)"
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
  import { MenuLinks } from './MenuLinks';

  const {t, locale} = useI18n();
  const config = useRuntimeConfig()
  const subdomain = useSubdomain()
  
  const domainPath: string = `//${config.VITE_DOMAIN_NAME}`;
  const menuLinks: MenuLinks = new MenuLinks();

  const checkLevel2ChildActive = (pathParts: string[]) => {
    return pathParts.length == 2 && pathParts[0] == 'undefined'
  }
</script>
