import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { ICollection } from '@/types/collection'

export const useCollectionsStore = defineStore('collection', () => {
  const collections = useLocalStorage<ICollection[]>('collections', [])

  function createCollection(c: ICollection) {
    collections.value.push(c)
  }

  function deleteCollection(c: ICollection) {
    const index = collections.value.indexOf(c)
    collections.value.splice(index, 1)
  }

  return {
    collections,
    createCollection,
    deleteCollection,
  }
})
