import { reactive, toRef } from 'vue'

export function useContacts(contacts) {
  const state = reactive({
    head: {},
    contacts: contacts || {},
    loading: false,
    error: '',
  })

  async function load(lang) {
    state.loading = true
    try {
      const response = await fetch(`/${lang}/api/contacts`)
      if (!response.ok) {
        state.error = response.statusText
        return
      }
      const { head, contacts } = await response.json()
      state.head = head
      state.contacts = contacts
    } catch (err) {
      state.error = err.message
    } finally {
      state.loading = false
    }
  }

  function isEmpty() {
    return Object.keys(state.contacts).length === 0
  }

  function reset() {
    state.head = {}
    state.contacts = {}
    state.loading = false
    state.error = ''
  }

  return {
    head: toRef(state, 'head'),
    contacts: toRef(state, 'contacts'),
    load,
    isEmpty,
    reset,
  }
}
