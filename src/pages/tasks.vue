<script setup lang="ts">
import { ref } from 'vue'
import CollectionMenu from '@/components/collections/CollectionMenu.vue'
import TaskList from '@/components/tasks/TaskList.vue'
import type { ICollection } from '@/types/collection'

const selectedCollection = ref<ICollection>()
</script>

<template>
  <div class="tasks--container">
    <div class="collections">
      <h2>
        Collections
      </h2>
      <CollectionMenu @set-collection="c => selectedCollection = c" />
    </div>
    <div class="tasks">
      <h2>
        Tasks
      </h2>
      <TaskList :collection="selectedCollection" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tasks--container {
  width: 100%;
  display: flex;

  .collections {
    width: 20%;
  }

  .tasks {
    flex: 1
  }
}
</style>
