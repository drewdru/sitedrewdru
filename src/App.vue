<template>
  <div id="app">
    <div class="nav static"></div>
    <div id="nav" class="nav fixed">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <LocaleChanger></LocaleChanger>
      <ThemeChanger></ThemeChanger>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less" src="./app.less"></style>
<script lang="ts" src="./app.ts"></script>
