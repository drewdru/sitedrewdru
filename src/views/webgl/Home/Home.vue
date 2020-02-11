<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="page home">
    <canvas id="glCanvas" ref="glCanvas"></canvas>
    <button v-if="isFullpage" @click="fullScrean" class="btn-fullscreen"
    >[]</button>
    <!-- v-shortkey="{'down': ['ctrl', 'a']}"
    @shortkey="theAction" -->
  </div>
</template>

<script lang="ts" src="./home.ts"></script>
<style scoped lang="less" src="./home.less"></style>

