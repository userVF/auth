<template>
  <nav class="login-links">
    <a v-if="auth.group == 'guest'" :href="`/${router.lang}/${loginLinks.login.path}`">
      {{ loginLinks.login.text }}
    </a>
    <a v-else :href="`/${router.lang}/${loginLinks.logout.path}`">
      {{ loginLinks.logout.text }}
    </a>
  </nav>
</template>

<script setup>

  import { inject } from 'vue'

  const { auth } = inject('auth')
  const { router } = inject('router')  
  const { loginLinks } = inject('header')

</script>