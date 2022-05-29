<i18n locale="en" lang="yaml" src="./en.yml" />
<i18n locale="ru" lang="yaml" src="./ru.yml" />

<template>
  <div class="home">
    <Head>
      <Title>Drew Dru - {{ t("HomePageTitle") }}</Title>
      <Meta name="description" :content="t('HomePageTitle')" />
    </Head>

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
try {
  const response = await useFetch("/api/users");
  console.log("Response: ", JSON.stringify(response));
} catch (error) {
  console.error("ERROR:", error);
}
</script>

<style lang="less" src="./index.less" />
