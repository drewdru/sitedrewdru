<template>
  <div class="locale-changer">
    <ui-vue-select
      v-model="selected"
      :id="`language`"
      :name="`language`"
      :items="languages"
      :isSearch="false"
      @change="localeChange"
    >
      <template #ui-vue-select-match="props">
        <flag :iso="props.selected.flag"></flag>
        <span>&nbsp;{{$t(props.selected.title)}}</span>
      </template>
      <template #ui-vue-select-options="props">
        <flag :iso="props.item.flag"></flag>
        <span>&nbsp;{{$t(props.item.title)}}</span>
      </template>
    </ui-vue-select>
  </div>
</template>


<script async lang="ts" src="./locale-changer.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" src="./locale-changer.less"></style>

