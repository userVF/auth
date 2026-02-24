<template>  

  <section class="not-found">
    {{ notFound }}
  </section>
 
</template>

<script setup>

  import { inject } from 'vue'

  const notFound = inject('notFound') 

</script>