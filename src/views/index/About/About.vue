<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="page about">
    <h1>{{$t('PageTitle')}}</h1>
        
    <div class="layout">
      <div class="form">
        <div class="form-group">
          <label for="name">{{$t('Language')}}:</label>
          <ui-vue-select
            v-model="language"
            :id="`language`"
            :name="`language`"
            :items="languages"
            :searchKeys="['title']"
            :required="false"
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
          <label for="name">{{$t('Name')}}:</label>
          <input class="form-control" name="name" type="text" v-model="name">
        </div>
        <div class="form-group">
          <label for="name">{{$t('Description')}}:</label>
          <input class="form-control" name="description" type="text" v-model="description">
        </div>
        <div class="form-group">
          <button @click="createTask"><span>{{$t('Add')}}</span></button>
        </div>
      </div>

      <div class="tasks">
        <div v-for="i in tasks" :key="i.id">
          <label class="checkbox-wrapper">
            <strong>{{i.name}}</strong>:&nbsp;<span>{{i.description}}</span>
            <input type="checkbox" @input="updateTask(i)" :checked="i.isDone">
            <span class="checkmark"></span>
          </label>
        </div>
      </div>

      <script async type="application/javascript" src="https://comments.app/js/widget.js?2" data-comments-app-website="THxuibF_" data-limit="5" data-page-id="about"></script>
    </div>
  </div>
</template>

<script asyncs lang="ts" src="./about.ts"></script>
<style scoped lang="less" src="./about.less"></style>
