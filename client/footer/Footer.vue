<template>

  <footer>

    <div class="text">
      {{ year }} {{ footer.text }}
    </div>
   
  </footer>
 
</template>

<script setup>

  import { inject } from 'vue'

  const footer = inject('footer')

  const year =  new Date().getFullYear()

</script>
