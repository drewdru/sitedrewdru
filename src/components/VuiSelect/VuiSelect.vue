<template>
    <div class="vui-select">      
      <select v-model="selected" class="hidden">
        <option v-for="(item, i) in items"
                :key="`item-${i}`"
                :value="item">
        </option>
      </select>
      <div v-show="!isOpened" class="vui-select-container"
          @click="openSelect()"
      >
        <slot name="vui-select-match" :selected="selected">&nbsp;</slot>
      </div>
      <input v-model="searchText"
            v-show="isOpened"
            class="vui-select-search"
            ref="selectSearch"
            @input="onSearch($event)"
      >
      <div class="vui-select-options" v-show="isOpened">
        <div v-for="(item, i) in searchItems"
            :key="`item-${i}`"
            :value="item"
            @click="selectItem(item)"
            class="vui-select-option"
        >
          <slot :name="`vui-select-options`"  :item="item"></slot>
        </div>
      </div>
    </div>
</template>


<script async lang="ts" src="./vui-select.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./vui-select.less"></style>

