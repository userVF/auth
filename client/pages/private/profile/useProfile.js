import { reactive, toRef } from 'vue'

export function useProfile(profile) {
  const state = reactive({
    head: {},
    profile: profile || {},
    loading: false,
    error: '',
  })

  async function load(lang) {
    state.loading = true
    try {
      const response = await fetch(`/${lang}/api/profile`)
      if (response.status === 403) {
        location.replace(`/${lang}/login`)
        return        
      }
      if (!response.ok) {
        state.error = response.statusText
        return
      }
      const { head, profile } = await response.json()
      state.head = head
      state.profile = profile
    } catch (err) {
      state.error = err.message
    } finally {
      state.loading = false
    }
  }

  function isEmpty() {
    return Object.keys(state.profile).length == 0
  }

  function reset(){
    state.head = {}
    state.profile = {}
    state.loading = false
    state.error = ''
  }

  return {
    head: toRef(state, 'head'),
    profile: toRef(state, 'profile'),
    load,
    isEmpty,
    reset,
  }
}

