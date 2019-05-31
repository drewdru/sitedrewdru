<template>
  <div class="locale-changer">
    <flag :iso="selected.flag"></flag>
    <select v-model="selected" @change="localeChange">
      <option v-for="(lang, i) in languages"
              :key="`Lang${i}`"
              :value="lang">
        {{ lang.title }}
      </option>
    </select>
  </div>
</template>


<script lang="ts" src="./locale-changer.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./locale-changer.less"></style>

