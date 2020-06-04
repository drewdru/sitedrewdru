<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="hello">
    <h1>{{ $t('PageTitle') }}</h1>
    <p>{{ msg }}</p>
  </div>
</template>


<script async lang="ts" src="./hello-world.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./hello-world.less"></style>

