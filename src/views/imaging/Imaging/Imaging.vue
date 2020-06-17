<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="page imaging">
    <div class="layout">
      <div class="form card">
        <div class="form-group">
          <label>Choose PDF file:&nbsp;
            <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
          </label>
          <button @click="submitFile()">Submit</button>
        </div>
      </div>
      <div class="form card" v-show="uid && !result">
        <h1>{{$t('Processing')}}:</h1>
        <p>{{$t('Pleas wait...')}}</p>
      </div>
      <div class="form card" v-show="result">
        <h1>{{$t('result')}}:</h1>
        <p>{{result}}</p>
      </div>
    </div>    
  </div>
</template>

<script async lang="ts" src="./imaging.ts"></script>
<style scoped lang="less" src="./imaging.less"></style>
