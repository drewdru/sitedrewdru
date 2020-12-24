<template>
  <div class="locale-changer">
    <details id="localeChanger" ref="localeChanger" @mouseleave="close">
      <summary>
        {{$t($i18n.locale)}}
      </summary>
      <div class="details-menu">
        <div
          v-for="(value, key) in languages"
          :key="key"
          class="details-menu-item"
          :class="{'selected': value.locale == $i18n.locale}"
          @click="localeChange(value.locale)"
        >
          <flag :iso="value.flag"></flag> {{value.locale}}
        </div>
      </div>
    </details>
  </div>
</template>


<script async lang="ts" src="./locale-changer.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" src="./locale-changer.less"></style>

