
import { createSSRApp } from 'vue'

import App from './App.vue'

import { useAuth } from './store/useAuth.js'
import { useRouter } from './store/useRouter.js'

import { useHome } from '@/pages/public/home/useHome.js'
import { useAbout } from '@/pages/public/about/useAbout.js'
import { useContacts } from '@/pages/public/contacts/useContacts.js'

import { useLogin } from '@/pages/auth/useLogin.js'
import { useProfile } from '@/pages/private/profile/useProfile.js'

export function createApp(ctx) {
  
  const app = createSSRApp(App)

  const { lang, view, params, path, auth: { group } } = ctx.context

  app.provide('auth', useAuth({ group }))
  app.provide('router', useRouter({ lang, view, params, path }))
  
  app.provide('header', ctx.data.header)
  
  app.provide('login', useLogin(ctx.data?.login))
  app.provide('profile', useProfile(ctx.data?.profile))
  app.provide('home', useHome(ctx.data?.home))  
  app.provide('about', useAbout(ctx.data?.about))  
  app.provide('contacts', useContacts(ctx.data?.contacts))
  app.provide('notFound', ctx.data?.notFoundData)

  app.provide('footer', ctx.data.footer)

  app.config.errorHandler = (err, instance, info) => {
    console.log('Vue errorHandler: ', err, instance, info)
  }

  return app
}