<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="page webpiano">
    <div class="container">
      <div class="keyboard">
        <div v-for="(notes_value, notes_key) in noteFreq" :key="notes_key"
          class="octave"
        >
          <div v-for="(value, key) in notes_value" :key="key"
            @mousedown="notePressed(value, key, notes_key)"
            @mouseup="noteReleased(value, key, notes_key)"
            @mouseleave="noteReleased(value, key, notes_key)"
            class="note"
            :class="{
              'black': key.includes('#'),
              'white': !key.includes('#'),
              'D': key.includes('D'),
              'E': key.includes('E'),
              'G': key.includes('G'),
              'A': key.includes('A'),
              'B': key.includes('B'),              
            }"
          >
            {{key}}
          </div>
          {{octaves[notes_key]}}
        </div>
      </div>
    </div>
    <div class="settingsBar">
      <div class="left">
        <span>Volume: </span>
        <input type="range" min="0.0" max="1.0" step="0.01"
            list="volumes" name="volume"
            @value="volume"
            @change="changeVolume"
          >
        <datalist id="volumes">
          <option value="0.0" label="Mute"></option>
          <option value="1.0" label="100%"></option>
        </datalist>
      </div>
      <div class="right">
        <span>Current waveform: </span>
        <ui-vue-select
            v-model="oscilatorType"
            :id="`oscilatorType`"
            :name="`oscilatorType`"
            :items="oscilatorTypes"
            :required="true"
          >
          <template #ui-vue-select-match="props">
            <span>&nbsp;{{$t(props.selected)}}</span>
          </template>
          <template #ui-vue-select-options="props">
            <span>&nbsp;{{$t(props.item)}}</span>
          </template>
        </ui-vue-select>

      </div>
    </div>
  </div>
</template>

<script asyncs lang="ts" src="./webpiano.ts"></script>
<style scoped lang="less" src="./webpiano.less"></style>
