<template>
  <div class="about">
    <h1>This is an about page</h1>
        
    <div class="layout">
      <div class="form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input class="form-control" name="name" type="text" v-model="name">
        </div>
        <div class="form-group">
          <label for="name">Description:</label>
          <input class="form-control" name="description" type="text" v-model="description">
        </div>
        <div class="form-group">
          <button @click="createTask">Add</button>
        </div>
      </div>

      <div class="tasks">
        <div v-for="i in tasks" :key="i.id">
          <input type="checkbox" @input="updateTask(i)" :checked="i.isDone">
          &nbsp;
          <strong>{{i.name}}</strong>:<span>{{i.description}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./about.ts"></script>
<style scoped lang="less" src="./about.less"></style>
