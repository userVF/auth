import { reactive, toRef, toRefs } from 'vue'

export function useAuth({ group }) {
  const state = reactive({
    group,
  })
  
  return {
    auth: state,   
  }
}