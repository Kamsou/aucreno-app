import { defineStore } from 'pinia'
import type { Database } from '~/types/supabase.types'
import type { User } from '@supabase/supabase-js'



export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient<Database>()
  
  const user = ref<User | null>(null)
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

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
    isAuthenticated.value = !!session?.user
  })

  return {
    user,
    isAuthenticated,
    fetchUser
  }
})
