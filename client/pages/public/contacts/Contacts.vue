<template>

  <section class="contacts">
    {{ contacts }}
  </section>

</template>

<script setup>

  import { onMounted, onUnmounted, inject } from 'vue'

  const { router } = inject('router')
  const {
    head,
    contacts,
    load,
    isEmpty,
    reset,
  } = inject('contacts')

  onMounted(async () => {
    if(isEmpty()) {
      await load(router.lang)
      document.title = head.value.title
      document.querySelector('meta[name="description"]')
        .setAttribute('content', head.value.description)
    }
  })

  onUnmounted(() => {
    reset()
  })

</script>