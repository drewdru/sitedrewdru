<template>
  <div class="theme-changer">    
    <flag :iso="flag"></flag>
    <select v-model="selected" @change="themeChange">
      <option v-for="(lang, i) in languages" :key="`Lang${i}`" :value="lang">
        {{ lang.title }}
      </option>
    </select>
  </div>
</template>


<script lang="ts" src="./theme-changer.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./theme-changer.less"></style>

