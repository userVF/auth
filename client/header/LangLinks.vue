<template>

   <nav class="lang-links">     
    <ul>
       <li v-for="(item, key) in header.langLinks" :key="key">
        <span v-if="item.lang == router.lang" class="active-link">
          {{ item.text }}
        </span>
        <a v-else :href="`/${item.lang}${trailingSlash(router.path)}`">
          {{ item.text }}
        </a>
      </li>
    </ul>
  </nav>

</template>

<script setup>

  import { inject } from 'vue'

  const { router, trailingSlash } = inject('router')
  const header = inject('header')

</script>