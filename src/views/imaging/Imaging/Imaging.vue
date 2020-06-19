<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="page imaging">
    <div class="layout">
      <div class="form card">
        <div class="form-group" v-show="error">
          <label>{{$t(error)}}</label>
        </div>
        <div class="form-group">
          <label for="name">{{$t('Document language')}}:</label>
          <ui-vue-select
            v-model="language"
            :id="`language`"
            :name="`language`"
            :items="languages"
            :searchKeys="['title']"
            :required="true"
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
        <div class="form-group">
          <label>{{$t('Choose PDF file')}}:&nbsp;
            <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
          </label>
        </div>
        <div class="form-group">
          <button @click="submitFile()">{{$t('Submit')}}</button>
        </div>
      </div>
      <div class="form card" v-show="uid && !result">
        <h1>{{$t('Processing')}}</h1>
        <p>{{$t('Pleas wait...')}}</p>
        <progress id="file" max="100" :value="progress">{{progress}}%</progress>
        <p>{{$t(status)}}</p>
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
