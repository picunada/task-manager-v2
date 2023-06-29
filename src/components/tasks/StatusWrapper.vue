<script setup lang="ts">
import { ref } from 'vue'
import { Status } from '@/types/enum/status'
import { useTasksStore } from '@/stores/tasks'

const props = defineProps<{
  modelValue?: boolean
  status: Status
}>()

const showDropIndicator = ref(false)
const counter = ref(0)

const taskStore = useTasksStore()

function onDrop(e: DragEvent, status: Status) {
  const taskID = e.dataTransfer!.getData('itemID')
  const task = taskStore.tasks.find(t => t.id === taskID)
  task!.status = status
  counter.value = 0
  showDropIndicator.value = false
}

function onDragEnter(e: DragEvent) {
  counter.value++
  showDropIndicator.value = true
}

function onDragLeave() {
  counter.value--
  if (counter.value === 0)
    showDropIndicator.value = false
}
</script>

<template>
  <div class="status" @drop="onDrop($event, status)" @dragover.prevent @dragenter.prevent="onDragEnter($event)"
    @dragleave="onDragLeave">
    <slot name="badge" />
    <div class="wrapper">
      <slot name="tasks" />

      <span v-if="showDropIndicator" class="indicator"
        :class="Object.keys(Status)[Object.values(Status).indexOf(props.status)]" />
      <slot name="button" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.status {
  display: flex;
  flex-direction: column;
  gap: $default-unit*2;

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: $default-unit;
  }
}

.indicator {
  width: 100%;
  height: 10px;
  border-radius: $default-unit*2;

  &.not-started {
    background-color: rgba($color: #5a5a5a, $alpha: .8);
  }

  &.in-progress {
    background-color: rgba($color: #a5ff7e, $alpha: .3);
  }

  &.done {
    background-color: rgba($color: #7e61ff, $alpha: .3);
  }
}
</style>
