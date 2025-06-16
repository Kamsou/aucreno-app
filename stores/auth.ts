import { defineStore } from 'pinia'
import type { Database } from '~/types/supabase.types'


export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient<Database>()
  
  const user = ref({})
  const isAuthenticated = ref(false)

  async function fetchUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error fetching user:', error)
      return
    }
    console.log('Fetched user:', data.user)
    user.value = data.user
    isAuthenticated.value = !!user.value
  }

  return {
    user,
    isAuthenticated,
    fetchUser
  }
})
