<template>
  <div id="app" class="class_name" :style="{
      '--body': theme.body,
      '--primary': theme.primary,
      '--secondary': theme.secondary,
      '--accent': theme.accent,
      '--error': theme.error,
      '--error': theme.info,
      '--error': theme.success,
      '--error': theme.warning,
    }">
    <div class="nav static"></div>
    <div id="nav" class="nav fixed" :style="{'background-color': theme.primary}">
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