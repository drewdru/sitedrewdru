<template>
  <div class="navbar">
    <div class="nav static"></div>
    <div id="nav" class="nav fixed" ref="nav">
      <router-link class="logo" to="/">
        <div class="wrapper">
          <img class="logo" alt="Drew Dru logo" src="@/assets/logo.svg">
        </div>
        <!-- <img align="center" src="@/assets/logo.png" width="112" height="28"> -->
      </router-link>
      <slot></slot>
      <LocaleChanger></LocaleChanger>
      <ThemeChanger></ThemeChanger>
    </div>
  </div>
</template>


<script async lang="ts" src="./nav-bar.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./nav-bar.less"></style>

