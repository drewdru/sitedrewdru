<template>
  <UTable
    :data="data"
    :columns="[
      {
        accessorKey: 'field',
        header: undefined,
        cell: ({ row }) => h(
          'span',
          { class: 'font-semibold text' },
          row.getValue('field')
        ),
        meta: {
          class: {
            td: 'relative before:absolute before:inset-0 before:bg-muted before:-z-10'
          }
        }
      },
      {
        accessorKey: 'value',
        header: undefined
      }
    ]"
  />
</template>

<script setup lang="ts">
import type { TableRow } from '@nuxt/ui'

defineProps<{ data: TableRow<{ field: string, value: string }>[] }>()
</script>
