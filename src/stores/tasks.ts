import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { ITask } from '@/types/task'
import type { Status } from '@/types/enum/status'
import type { ICollection } from '@/types/collection'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = useLocalStorage<ITask[]>('tasks', [])

  function createTask(collection: ICollection, status: Status) {
    const t: ITask = {
      id: crypto.randomUUID(),
      name: 'New Task',
      description: '',
      collection: collection.id,
      created: new Date(),
      status,
    }
    tasks.value.push(t)
  }

  function deleteTask(t: ITask) {
    const index = tasks.value.indexOf(t)
    tasks.value.splice(index, 1)
  }

  return { tasks, createTask, deleteTask }
})
