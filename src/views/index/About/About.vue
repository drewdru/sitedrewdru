<template>
  <div class="about">
    <h1>This is an about page</h1>
    
    <div v-for="i in tasks" :key="i.id">
      <ul>
        <li>
          <strong>{{i.name}}</strong>:<span>{{i.description}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" src="./about.ts"></script>
<style scoped lang="less" src="./about.less"></style>
