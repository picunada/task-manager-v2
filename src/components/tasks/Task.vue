<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { ITask } from '@/types/task'
import { useTasksStore } from '@/stores/tasks'

const props = defineProps<{
  task: ITask
}>()

const taskStore = useTasksStore()

const taskRef = ref<HTMLDivElement | null>()
const taskName = ref<HTMLInputElement | null>()
const showButtons = ref(false)
const editable = ref(false)

function startDrag(evt: DragEvent, item: ITask) {
  evt.dataTransfer!.dropEffect = 'move'
  evt.dataTransfer!.effectAllowed = 'move'
  evt.dataTransfer!.setData('itemID', item.id)
}

function onEnter() {
  showButtons.value = true
}

function onLeave() {
  showButtons.value = false
}

function onEdit() {
  editable.value = !editable.value
  nextTick(() => {
    taskName.value?.focus()
  })
}

function onDelete() {
  taskStore.deleteTask(props.task)
}

onClickOutside(taskRef, (e) => {
  editable.value = false
})
</script>

<template>
  <div ref="taskRef" class="task" :draggable="editable ? 'false' : 'true'" @dragstart="startDrag($event, task)"
    @mouseenter="onEnter" @mouseleave="onLeave">
    <input v-if="editable" ref="taskName" v-model="taskStore.tasks.find(t => t.id === props.task.id)!.name"
      placeholder="Name" type="text">
    <p v-else>
      {{ taskStore.tasks.find(t => t.id === props.task.id)!.name }}
    </p>
    <input v-if="editable" v-model="taskStore.tasks.find(t => t.id === props.task.id)!.description" class="description"
      placeholder="Description" type="text">
    <p v-else class="description">
      {{ taskStore.tasks.find(t => t.id === props.task.id)!.description }}
    </p>
    <Transition>
      <div v-if="showButtons" class="buttons">
        <button @click="onEdit">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="m14.06 9l.94.94L5.92 19H5v-.92L14.06 9m3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75Z" />
          </svg>
        </button>
        <button @click="onDelete">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.task {
  max-width: 100%;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: $default-unit*2;
  background-color: rgb(10, 10, 10);
  padding: $default-unit*2 $default-unit*4;
  border-radius: $default-unit*2;
  cursor: pointer;

  &:hover {
    background-color: rgb(15, 15, 15);
    ;
  }

  input {
    max-width: 100%;
    box-sizing: border-box;
    display: inline;
    background-color: transparent;
    font-size: calc(100vw/2560 * 24);

    &:focus {
      outline: none;
    }
  }

  p {
    font-size: calc(100vw/2560 * 24)
  }

  .description {
    font-size: calc(100vw/2560 * 20);
    color: rgba(var(--primary), 0.6)
  }

  .buttons {
    position: absolute;
    top: 0;
    right: 0;
    translate: -10% 25%;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: $default-unit*2;
    border: 1px solid rgba(var(--secondary), 0.4);

    button {
      padding: $default-unit;

      &:hover {
        background-color: rgba(var(--secondary), 0.4);
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
