<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="sign-in"
    tabindex="0"
    @focus="isFocus=true"
    @blur="isFocus=false"
    v-shortkey="{'down': ['enter']}"
    @shortkey="e => isFocus && open(e)"
  >
    <!-- TODO: ADD User Avatar, Add user menu -->
    <img
      @click="e => open(e)"
      class="wrapper animated infinite rotate delay-2s"
      alt="User Avatar"
      src="@/assets/andrew.png"
    >

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
      </template>
    </ModalWindow>
  </div>
</template>


<script async lang="ts" src="./sign-in.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./sign-in.less"></style>

