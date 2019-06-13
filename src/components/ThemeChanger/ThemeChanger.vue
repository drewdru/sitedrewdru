<template>
  <div class="theme-changer">
    
    <!-- <v-select :options="options" label="title">
      <template slot="option" slot-scope="option"> -->
          <!-- <span class="fa" :class="option.icon"></span> -->
          <!-- <font-awesome-icon :icon="option.icon"></font-awesome-icon>
          {{ option.title }}
      </template>
    </v-select> -->



    <select v-model="selected" @change="themeChange">
      <option v-for="(theme, i) in themes" :key="`Theme${i}`" :value="theme">
        {{ theme.themeName }}
      </option>
    </select>
  </div>
</template>


<script lang="ts" src="./theme-changer.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./theme-changer.less"></style>

