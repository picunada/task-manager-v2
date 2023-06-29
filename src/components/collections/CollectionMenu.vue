<script setup lang="ts">
import { ref } from 'vue'
import Button from '../ui/Button.vue'
import CollectionCreate from './CollectionCreate.vue'
import { useCollectionsStore } from '@/stores/collections'

const emit = defineEmits(['set-collection'])

const store = useCollectionsStore()
const create = ref(false)
const focus = ref(false)

function onCreate() {
  create.value = !create.value
  focus.value = true
}

function onClose() {
  create.value = !create.value
  focus.value = false
}
</script>

<template>
  <div class="collection-menu">
    <Button v-if="!create" @click="onCreate">
      <p class="button-text">
        Create
      </p>
    </Button>
    <CollectionCreate v-else :focus="focus" @close="onClose" />
    <div v-if="store.collections.length > 0" class="collection--container">
      <div v-for="collection in store.collections" :key="collection.id" :tabindex="collection.id"
        class="collection--element" @click="emit('set-collection', collection)">
        {{ collection.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection-menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: $default-unit*4;
  gap: $default-unit*4;
  // background-color: rgb(var(--secondary-background));
  border-radius: $default-unit*2;

  .collection--container {
    display: flex;
    flex-direction: column;
    gap: $default-unit*2;
    font-size: calc(100vw/2560*20);

    .collection--element {
      display: flex;
      padding: $default-unit*2 $default-unit*4;
      border-radius: $default-unit*2;
      background-color: rgb(10, 10, 10);
      transition: box-shadow 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: rgb(15, 15, 15);
        ;
      }
    }
  }

}

.button-text {
  font-size: calc(100vw/2560*20);
}
</style>
