<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
<div class="page privacy">
    <div class="layout">
        <h1>{{$t('PrivacyPolicy')}}</h1>
        <p>{{$t('LastUpdated')}}</p>
        <p>{{$t('WeAre')}}</p>
        <p>{{$t('WeUse')}}</p>
        <h2>{{$t('CollectionAndUseTitle')}}</h2>
        <p>{{$t('CollectionAndUse')}}</p>
        <h2>{{$t('LogDataTitle')}}</h2>
        <p>{{$t('LogData')}}</p>
        <p>{{$t('LogDataMayInclude')}}</p>
        <p>{{$t('LogDataThirdParty')}}</p>
        <h2>{{$t('CookiesTitle')}}</h2>
        <p>{{$t('Cookies')}}</p>
        <p>{{$t('CookiesCollect')}}</p>
        <h2>{{$t('SecurityTitle')}}</h2>
        <p>{{$t('Security')}}</p>
        <h2>{{$t('ChangesTitle')}}</h2>
        <p>{{$t('Changes')}}</p>
        <p>{{$t('ChangesUpdate')}}</p>
        <p>{{$t('ChangesUpdateNotification')}}</p>
        <h2>{{$t('ContactUsTitle')}}</h2>
        <p>{{$t('ContactUs')}}</p>
    </div>
</div>
</template>

<script async lang="ts" src="./privacy.ts"></script>

<style scoped lang="less" src="./privacy.less"></style>
