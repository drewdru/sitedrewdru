<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="sidebar" v-if="isSideBar">
    <div class="sidebar-shadow" @click="isSideBar=false"></div>
    <div
      class="sidebar-content"
      :class="{'open': isSideBar}"
    >
      <a class="closebtn link" @click="isSideBar=false">&times;</a>
      <div class="sidebar-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script async lang="ts" src="./side-bar.ts"></script>
<style scoped lang="less" src="./side-bar.less"></style>
