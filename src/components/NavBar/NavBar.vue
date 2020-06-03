<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="navbar">
    <div class="nav static"></div>
    <div id="nav" class="nav fixed" ref="nav">
      <a class="logo" :href="domainName">
        <div class="wrapper">
          <img class="logo" alt="Drew Dru logo" src="@/assets/logo.svg">
        </div>
      </a>

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

      <ThemeChanger></ThemeChanger>
      <div class="locale">
        <div class="name">
          {{$t($i18n.locale)}}
          <i class="arrow down"></i>
        </div>
        <LocaleChanger></LocaleChanger>
      </div>
    </div>
  </div>
</template>

<script async lang="ts" src="./nav-bar.ts"></script>
<style scoped lang="less" src="./nav-bar.less"></style>
