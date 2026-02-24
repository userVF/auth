<template>

  <form  class="login-form" @submit.prevent novalidate>

    <fieldset v-if="showInitForm" class="form-group">
      <legend>{{ login.ui.legend }}</legend>

      <fieldset class="radio-group">
        <legend class="visually-hidden">{{ login.ui.chooseChannel }}</legend>
        <input id="whatsapp" type="radio" name="channel" value="whatsapp" v-model="channel" disabled />
        <label for="whatsapp">WhatsApp</label>
        <input id="email" type="radio" name="channel" value="email" v-model="channel" disabled />
        <label for="email">Email</label>
      </fieldset>

      <div class="input-group">
        <input
          type="tel"
          id="identifier"
          name="identifier"
          inputmode="tel"
          autocomplete="tel"
          required
          aria-describedby="identifier-help"
          v-model="identifier"
        />
        <div class="alert-container" role="alert">
          <p v-if="showIdentifierAlert" class="alert">
            {{ result.message }}
          </p>
        </div>
      </div>

      <button type="button" @click="init">{{ login.ui.initCode }}</button>

    </fieldset>

    <fieldset v-else class="form-group">
      <legend>{{ login.ui.legend }}</legend>

      <div class="code-message-group">
        <p class="init">{{ codeMessages.init }}</p>
        <p class="retry">{{ codeMessages.retry }}</p>
      </div>

      <div class="input-group">
        <input
          type="text"
          id="code"
          name="code"
          inputmode="numeric"
          autocomplete="one-time-code"
          pattern="[0-9]*"
          required
          v-model="code"
          maxlength="5"
        />
        <div class="alert-container" role="alert">
          <p v-if="showCodeAlert" class="alert">
            {{ result.message }}
          </p>
        </div>
      </div>

      <div class="button-group">
        <button type="button" @click="init">{{ login.ui.repeatInitCode }}</button>
        <button type="button" @click="reset">{{ login.ui.editIdentifier }}</button>
      </div>

    </fieldset>

    <div class="info-container" role="alert">
      <p v-if="sending" class="sending">{{ login.ui.sending}}</p>
      <p v-else-if="showError" class="error">{{ result.message }}</p>
    </div>

  </form>

</template>

<script setup>

  import { inject, watch, computed, ref } from 'vue'

  const { router } = inject('router')

  const {
    send,
    identifier,
    code,
    channel,
    login,
    result,
    sending,
    resetMessage,
    resetCode,
    reset,
  } = inject('login')

  const codeMessages = ref({ init: '', retry: '' })
  watch(result, result => {
    if (['sent', 'cooldown'].includes(result.status)) {
      codeMessages.value.init = `${result.message.init} ${identifier.value}`
      codeMessages.value.retry = `${result.message.retry[0]} ${result.retryAfter} ${result.message.retry[1]}`
    }
    if (result.status === 'welcome' && result.redirectPath) {
      location.replace(result.redirectPath)
    }
  })
  
  watch(identifier, () => {
      resetMessage()
  })
  watch(code, async newCode => {
    resetMessage()
    if (newCode.length === 5 && /^\d{5}$/.test(newCode)) {
      await send(`/${router.lang}/api/login/complete`)
    }
  })

  const showInitForm = computed(() =>
    ['init', 'invalidRequest', 'notSent', 'initError'].includes(result.value.status)
  )

  const showIdentifierAlert = computed(() =>
    ['invalidRequest', 'notSent'].includes(result.value.status)
  )
  const showCodeAlert = computed(() =>
    ['invalidRequest', 'expiredCode', 'invalidCode'].includes(result.value.status)
  )
  const showError = computed(() =>
    ['initError', 'completeError'].includes(result.value.status)
  )

  async function init() {
    resetCode()
    await send(`/${router.lang}/api/login/init`)
  }

</script>
