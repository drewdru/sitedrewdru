<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="theme-changer">
    
    <!-- <v-select :options="options" label="title">
      <template slot="option" slot-scope="option"> -->
          <!-- <span class="fa" :class="option.icon"></span> -->
          <!-- <font-awesome-icon :icon="option.icon"></font-awesome-icon>
          {{ option.title }}
      </template>
    </v-select> -->

    <div @click="openThemesBoard" class="wrapper animated infinite rotate delay-2s"
        :style="themeChangerCircleWrapperCss">
      <div class="sector red" style="transform: rotate(75deg) skew(60deg);"></div>
      <div class="sector red-orange" style="transform: rotate(105deg) skew(60deg);"></div>
      <div class="sector orange" style="transform: rotate(135deg) skew(60deg);"></div>
      <div class="sector yellow-orange" style="transform: rotate(165deg) skew(60deg);"></div>
      <div class="sector yellow" style="transform: rotate(195deg) skew(60deg);"></div>
      <div class="sector yellow-green" style="transform: rotate(225deg) skew(60deg);"></div>
      <div class="sector green" style="transform: rotate(255deg) skew(60deg);"></div>
      <div class="sector blue-green" style="transform: rotate(285deg) skew(60deg);"></div>
      <div class="sector blue" style="transform: rotate(315deg) skew(60deg);"></div>
      <div class="sector blue-violet" style="transform: rotate(345deg) skew(60deg);"></div>
      <div class="sector violet" style="transform: rotate(375deg) skew(60deg);"></div>
      <div class="sector red-violet" style="transform: rotate(405deg) skew(60deg);"></div>
      <div class="circle" :style="{'background-color': theme.primary}"></div>
    </div>

    <div class="modal-wrapper">
      <div class="modal-content">
        <div class="modal-header" :style="{
            color: theme.primary,
            'background-color': theme.secondary}">
          <span class="close">&times;</span>
          <h2>{{$t('modalHeader')}}</h2>
        </div>
        <div class="modal-body">
          <div class="theme-card">
            {{$t('customizeTheme')}}
          </div>
          <div class="theme-card" v-for="(theme, i) in themes"
              :key="`Theme${i}`"
              @click="themeChange($event, theme.themeName)">
            {{ theme.themeName }}
            {{ theme }}
          </div>
          
          <!-- <select v-model="selected" @change="themeChange">
            <option v-for="(theme, i) in themes" :key="`Theme${i}`" :value="theme">
              {{ theme.themeName }}
            </option>
          </select> -->
        </div>
        <!-- <div class="modal-footer">
          <h3>Modal Footer</h3>
        </div> -->
      </div>
    </div>

  </div>
</template>


<script lang="ts" src="./theme-changer.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./theme-changer.less"></style>

