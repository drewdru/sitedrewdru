import { defineStore } from 'pinia'

import type { ResponseGetSelfSchema } from '~~/shared/schemas/visitor'

import { fetchVisitor } from '../utils/api/visitor/fetchVisitor'

export const useVisitorStore = defineStore('visitorStore', () => {
  const visitor = ref<ResponseGetSelfSchema | null>(null)

  const isHydrated = ref<boolean>(false)
  function hydrate() {
    setTimeout(async () => {
      try {
        visitor.value = await fetchVisitor()
      } finally {
        isHydrated.value = true
      }
    }, 3000) // to be sure that user not spam f5
  }
  return {
    isHydrated,
    hydrate,
    visitor
  }
})
