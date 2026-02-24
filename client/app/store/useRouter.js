import { reactive, toRef, toRefs } from 'vue'

export function useRouter({ lang, view, params, path }) {
  const state = reactive({
    lang,
    view,
    params,
    path: path.substring(4),
  })

  function trailingSlash(path) {
    return path.length > 0 ? `/${path}` : ''
  }

  function reset({ view, path, params }) {
    state.view = view
    if (path != undefined) {
      if (!import.meta.env.SSR) {
        history.pushState({}, '', `/${state.lang}${trailingSlash(path)}`)
      }
      state.path = path
    }
    if (params) {
      state.params = params
    }
  }

  return {
    router: state,
    trailingSlash,
    reset,    
  }
}