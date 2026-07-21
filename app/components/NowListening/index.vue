<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <UCard
    :ui="{
      root: 'h-50 sm:h-50 md:h-50 lg:h-35 flex flex-col sm:p-1 md:p-1 lg:p-1',
      body: 'sm:p-5 md:p-5 lg:p-1 flex flex-col overflow-hidden'
    }"
  >
    <div class="shrink-0">
      {{ t('NowListening') }}
    </div>
    <UPageList
      divide
      class="overflow-y-auto flex-1 h-full"
      :ui="{
        base: 'h-full'
      }"
    >
      <UPageCard
        v-for="(track, index) in tracks"
        :key="index"
        variant="ghost"
        :to="track.to"
        :target="track.target"
        :ui="{
          root: 'sm:p-1 md:p-1 lg:p-1',
          body: 'sm:p-1 md:p-1 lg:p-1',
          container: 'sm:p-1 md:p-1 lg:p-1'
        }"
      >
        <template #body>
          <UUser
            :name="track.name"
            :description="track.description"
            :avatar="track.avatar"
            size="xl"
            class="relative"
          />
        </template>
      </UPageCard>
      <UPageCard
        variant="ghost"
        to="https://www.last.fm/user/drew-dru"
        target="_blank"
        :ui="{
          root: 'sm:p-1 md:p-1 lg:p-1',
          body: 'sm:p-1 md:p-1 lg:p-1',
          container: 'sm:p-1 md:p-1 lg:p-1'
        }"
      >
        {{ t('SeeMoreOn') }} last.fm
      </UPageCard>
    </UPageList>
  </UCard>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { data } = await useFetch(`/api/lastfm/user/drew-dru`)
const tracks = (data.value?.recenttracks?.track ?? []).map(
  item => ({
    name: item.artist?.['#text'],
    description: item.name,
    avatar: {
      src: item.image?.at(0)?.['#text']
    },
    to: item.url,
    target: '_blank',
    nowplaying: item['@attr']?.nowplaying === 'true'
  })
)
</script>
