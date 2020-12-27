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
      :src="user.avatar || '/img/anonymouse_user.png'"
      v-if="user"
    >
    <div v-else class="wrapper btn">
      <a :href="signInLink" class="link">
          {{$t('SignIn')}}
      </a>
    </div>
  </div>
</template>


<script async lang="ts" src="./sign-in.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./sign-in.less"></style>

