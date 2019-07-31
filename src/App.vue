<template>
  <div id="app" :style="{
      '--body': theme.body,
      '--body-text': theme.bodyText,
      '--primary': theme.primary,
      '--secondary': theme.secondary,
      '--active': theme.active,
      '--accent': theme.accent,
      '--error': theme.error,
      '--info': theme.info,
      '--success': theme.success,
      '--warning': theme.warning,
      '--shadow': theme.shadow,
    }">
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