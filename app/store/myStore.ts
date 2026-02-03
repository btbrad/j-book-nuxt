import { defineStore } from 'pinia'

export const useMystore = defineStore('myStore', {
  state: () => {
    return {
      count: 0,
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
