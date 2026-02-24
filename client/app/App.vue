<template>
  
  <div class="header-contaiter">
    <Header />
  </div>

  <main>
    <component :is="view" />
  </main>

  <div class="footer-contaiter">
    <Footer />
  </div>
  
</template>

<script setup>

  import { inject, computed, onMounted, onUnmounted } from 'vue'

  import Header from '@/header/Header.vue'

  import Login from '@/pages/auth/Login.vue'
  import Profile from '@/pages/private/profile/Profile.vue'
  
  import Home from '@/pages/public/home/Home.vue'
  import About from '@/pages/public/about/About.vue'
  import Contacts from '@/pages/public/contacts/Contacts.vue'  
  import NotFound from '@/pages/public/not-found/NotFound.vue'

  import Footer from '@/footer/Footer.vue'

  const { router } = inject('router')

  const views = { Home, Login, Profile, About, Contacts, NotFound }
  const view = computed(() => views[router.view])
  
  const onPopstate = () => {
    location.reload()
  }
  onMounted(() => {
    addEventListener('popstate', onPopstate) 
  })
  onUnmounted(() => {
    removeEventListener('popstate', onPopstate)
  })

</script>