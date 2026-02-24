import { reactive, toRef, toRefs } from 'vue'

export function useLogin(login) {
  const state = reactive({
    head: {},
    login: login || {},
    sending: false,
    inputs: {
      identifier: '+7(777)777-77-79',
      channel: 'whatsapp',
      code: '',
    },
    result: { status: 'init' },    
  })

  async function send(url) {
    state.sending = true
    const errorStatus = url.endsWith('init') 
      ? 'initError' : 'completeError'
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(state.inputs),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5_000)
      })      
      if (!response.ok) {
        state.result = { status: errorStatus, message: response.statusText }
        return
      }
      state.result = await response.json()
    } catch (err) {
      if (err.name === 'TimeoutError') {
        state.result = { status: errorStatus, message: err.message }
      }
    } finally {
      state.sending = false
    }
  }

  function resetMessage() {
    if (state.result?.message) {
      state.result.message = ''
    }   
  }

  function resetCode() {
    state.inputs.code = ''
  }

  function reset() {
    state.result = { status: 'init' }
    state.inputs.code = ''
  }

  const { identifier, code, channel } = toRefs(state.inputs)
  return {
    send,
    identifier,
    code,
    channel,
    login: toRef(state, 'login'),
    result: toRef(state, 'result'),
    sending: toRef(state, 'sending'),
    resetMessage,
    resetCode,
    reset,
  }
}
