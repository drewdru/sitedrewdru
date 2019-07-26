<template>
  <div class="theme-changer">
    
    <!-- <v-select :options="options" label="title">
      <template slot="option" slot-scope="option"> -->
          <!-- <span class="fa" :class="option.icon"></span> -->
          <!-- <font-awesome-icon :icon="option.icon"></font-awesome-icon>
          {{ option.title }}
      </template>
    </v-select> -->

    <div class="wrapper animated infinite rotate delay-2s" :style="{'box-shadow': themeChangerCircleWrapperCss}">
      <div class="sector red" style="transform: rotate(75deg) skew(60deg);"></div>
      <div class="sector red-orange" style="transform: rotate(105deg) skew(60deg);"></div>
      <div class="sector orange" style="transform: rotate(135deg) skew(60deg);"></div>
      <div class="sector yellow-orange" style="transform: rotate(165deg) skew(60deg);"></div>
      <div class="sector yellow" style="transform: rotate(195deg) skew(60deg);"></div>
      <div class="sector yellow-green" style="transform: rotate(225deg) skew(60deg);"></div>
      <div class="sector green" style="transform: rotate(255deg) skew(60deg);"></div>
      <div class="sector blue-green" style="transform: rotate(285deg) skew(60deg);"></div>
      <div class="sector blue" style="transform: rotate(315deg) skew(60deg);"></div>
      <div class="sector blue-violet" style="transform: rotate(345deg) skew(60deg);"></div>
      <div class="sector violet" style="transform: rotate(375deg) skew(60deg);"></div>
      <div class="sector red-violet" style="transform: rotate(405deg) skew(60deg);"></div>
      <div class="circle" :style="{color: theme.primary}"></div>
    </div>

    <!-- <select v-model="selected" @change="themeChange">
      <option v-for="(theme, i) in themes" :key="`Theme${i}`" :value="theme">
        {{ theme.themeName }}
      </option>
    </select> -->
  </div>
</template>


<script lang="ts" src="./theme-changer.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./theme-changer.less"></style>

