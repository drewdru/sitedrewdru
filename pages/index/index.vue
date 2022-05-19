<i18n locale="en" lang="yaml" src="./en.yml" />
<i18n locale="ru" lang="yaml" src="./ru.yml" />

<template>
  <div class="home">
    <div class="layout">
      <div class="hello">
        <h1>{{ t("HiDrewDru") }}</h1>
        <transition name="cutie-mark" appear>
          <img class="cutie-mark" :alt="t('LogoAlt')" src="@/assets/logo.svg" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useMeta({
  meta: [{ name: "description", content: "Drew Dru's site" }],
  titleTemplate: "Drew Dru - %s",
  title: t("HomePageTitle"),
});

const { data } = await useFetch("/api/hello", { params: { foo: "bar" } });
console.log(JSON.stringify(data.value));
// const config = useRuntimeConfig();
// console.log(config);
</script>

<style lang="less" src="./index.less" />
