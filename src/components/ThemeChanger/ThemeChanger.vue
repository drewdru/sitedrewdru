<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="theme-changer"
    tabindex="0"
    @focus="isFocus=true"
    @blur="isFocus=false"
    v-shortkey="{'down': ['enter']}"
    @shortkey="e => isFocus && open(e)"
  >
    <div @click="e => open(e)" class="wrapper animated infinite rotate delay-2s">
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

    <ModalWindow v-if="isOpen && isCustomize" v-show="isCustomize" @close="closeCustomizeModal()">
      <template #modal-header>
        <h2>{{$t('CustomizeTheme')}}</h2>
      </template>
      <template #modal-body>
        <div class="customize-card">
          <div class="customize-palette" v-for="(color, key, i) in theme"
            :key="`Customize${i}`"
            v-show="key!='themeName'"
          >
            <div class="form card">
              <div class="form-group">
                <label :for="key">{{$t(key)}}:</label>
                <div :style="{'background-color': color}"></div>
                <input
                  class="card-control"
                  :name="key"
                  type="text"
                  v-model="theme[key]"
                  @input="saveCustomTheme"
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </ModalWindow>

    <ModalWindow
      v-if="isOpen"
      v-show="!isCustomize"
      @close="e => close(e)"
      v-shortkey.native="{'down': ['esc']}"
      @shortkey.native="e => !isCustomize && close(e)"
    >
      <template #modal-header>
        <h2>{{$t('ModalHeader')}}</h2>
      </template>
      <template #modal-body>
        <div class="theme-card" @click="openCustomizeModal()">
          <h1 class="theme-name">{{$t('CustomizeTheme')}}</h1>          
          <div class="theme-palette" v-for="(color, key, i) in theme"
            :key="`Theme${i}`"
            v-show="key!='themeName'"
            :style="{'background-color': color}"
          ></div>
        </div>
        <div class="theme-card" v-for="(cardTheme, i) in themes"
            :key="`Theme${i}`"
            @click="themeChange($event, cardTheme.themeName)"
            :style="{
              'box-shadow': `0 1px 9px 1px ${cardTheme.shadow}`,
              '--body': cardTheme.body,
              '--body-text': cardTheme.bodyText,
              '--accent': cardTheme.accent,
              '--accent-text': cardTheme.accentText,
              '--primary': cardTheme.primary,
              '--secondary': cardTheme.secondary,
              '--active': cardTheme.active,
              '--error': cardTheme.error,
              '--info': cardTheme.info,
              '--info-text': cardTheme.info,
              '--success': cardTheme.success,
              '--warning': cardTheme.warning,
              '--shadow': cardTheme.shadow,
            }">
          <h1 class="theme-name">{{ $t(cardTheme.themeName) | capitalize }}</h1>          
          <div class="theme-palette" v-for="(color, key, i) in cardTheme"
            :key="`Theme${i}`"
            v-show="key!='themeName'"
            :style="{'background-color': color}"
          ></div>
        </div>
      </template>
    </ModalWindow>
  </div>
</template>


<script async lang="ts" src="./theme-changer.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./theme-changer.less"></style>

