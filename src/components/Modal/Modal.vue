<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="closeThemeChangerModal">&times;</span>
        <h2>{{ title }}</h2>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer" v-if="footer">
        <h3>{{ footer }}</h3>
      </div>
    </div>
  </div>
</template>


<script async lang="ts" src="./modal.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./modal.less"></style>

