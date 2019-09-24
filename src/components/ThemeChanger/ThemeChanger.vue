<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="theme-changer">
    <div @click="openThemeChangerModal" class="wrapper animated infinite rotate delay-2s">
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
      <div class="circle"></div>
    </div>

    <div class="modal-wrapper" v-if="themeChangerModal" @click.self="closeThemeChangerModal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" @click="closeThemeChangerModal">&times;</span>
          <h2>{{$t('modalHeader')}}</h2>
        </div>
        <div class="modal-body">
          <div class="theme-card">
            {{$t('customizeTheme')}}
          </div>
          <div class="theme-card" v-for="(cardTheme, i) in themes"
              :key="`Theme${i}`"
              @click="themeChange($event, cardTheme.themeName)"
              
              :style="{
                'box-shadow': `0 1px 9px 1px  ${cardTheme.primary}`,
                '--body': cardTheme.body,
                '--body-text': cardTheme.bodyText,
                '--accent': cardTheme.accent,
                '--accent-text': cardTheme.accentText,

                '--primary': cardTheme.primary,
                '--secondary': cardTheme.secondary,
                '--active': cardTheme.active,
                '--error': cardTheme.error,
                '--info': cardTheme.info,
                '--success': cardTheme.success,
                '--warning': cardTheme.warning,
                '--shadow': cardTheme.shadow,
              }">
              <!---->
            {{ cardTheme.themeName }}
            {{ cardTheme }}
          </div>
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

