import { reactive, toRef } from 'vue'

export function useAbout(about) {
  const state = reactive({
    head: {},
    about: about || {},
    loading: false,
    error: '',
  })

  async function load(lang) {
    state.loading = true
    try {
      const response = await fetch(`/${lang}/api/about`)
      if (!response.ok) {
        state.error = response.statusText
        return
      }
      const { head, about } = await response.json()
      state.head = head
      state.about = about
    } catch (err) {
      state.error = err.message
    } finally {
      state.loading = false
    }
  }

  function isEmpty() {
    return Object.keys(state.about).length === 0
  }

  function reset() {
    state.head = {}
    state.about = {}
    state.loading = false
    state.error = ''
  }

  return {
    head: toRef(state, 'head'),
    about: toRef(state, 'about'),
    load,
    isEmpty,
    reset,
  }
}
