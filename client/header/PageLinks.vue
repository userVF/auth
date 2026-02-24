<template>
  
  <nav class="page-links">
    <ul>       
      <li v-for="(item, key) in header.pageLinks" :key="key">
        <span v-if="item.path == router.path" class="active-link">
          {{ item.text }}
        </span>
        <a v-else :href="`/${router.lang}${trailingSlash(item.path)}`"
          @click.stop.prevent="reset({
            view: item.view,
            path: item.path,
          })"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>
  </nav>

</template>

<script setup>

  import { inject } from 'vue'

  const { router, trailingSlash, reset } = inject('router')
  const header = inject('header')

</script>