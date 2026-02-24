import { reactive, toRef } from 'vue'

export function useHome(home) {  
  const state = reactive({
    head: {},
    home: home || {},
    loading: false,
    error: '',
  })

  async function load(lang) {
    state.loading = true
    try {
      const response = await fetch(`/${lang}/api/home`)
      if (!response.ok) {
        state.error = response.statusText
        return
      }
      const { head, home } = await response.json()
      state.head = head
      state.home = home
    } catch (err) {
      state.error = err.message
    } finally {
      state.loading = false
    }
  }

  function isEmpty() {
    return Object.keys(state.home).length === 0
  }

  function reset() {
    state.head = {}
    state.home = {}
    state.loading = false
    state.error = ''
  }

  return {
    head: toRef(state, 'head'),
    home: toRef(state, 'home'),
    load,
    isEmpty,
    reset,
  }
}