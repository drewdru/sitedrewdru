<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="navbar">
    <div class="nav static"></div>
    <div id="nav" class="nav fixed" ref="nav">
      <a class="logo" :href="domainName">
        <div class="logo-wrapper">
          <img class="logo" alt="Drew Dru logo" src="@/assets/logo.svg">
        </div>
      </a>
      <div class="nav-content">

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

        <SignIn v-if="$route.name != 'auth'"></SignIn>
        <ThemeChanger></ThemeChanger>
        <LocaleChanger></LocaleChanger>
      </div>
      <a class="burger link" @click="isSideBar=true">&#9776;</a>
    </div>
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
          <!-- <a class="link"></a> -->
        </summary>
        <div class="details-menu">
          <a v-for="(value, key) in subdomains"
            :key="key" :href="value.path" class="link">{{$t(value.name)}}
          </a>
        </div>
      </details>
    </SideBar>
  </div>
</template>

<script async lang="ts" src="./nav-bar.ts"></script>
<style scoped lang="less" src="./nav-bar.less"></style>
