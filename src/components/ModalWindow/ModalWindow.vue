<template>
  <div class="modal-wrapper" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header" v-if="isHeader">
        <span class="close" @click="$emit('close')">&times;</span>
        <slot :name="`modal-header`">
          <h2>Modal Header</h2>
        </slot>
      </div>
      <div class="modal-body" v-if="isBody">
        <slot :name="`modal-body`">
          <h2>Modal Body</h2>
        </slot>
      </div>
      <div class="modal-footer" v-if="isFooter">
        <slot :name="`modal-footer`">
          <h2>Modal Footer</h2>
        </slot>
      </div>
    </div>
  </div>
</template>


<script async lang="ts" src="./modal-window.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./modal-window.less"></style>

