import { defineStore } from 'pinia'
import type { Database, Tables } from '~/types/supabase.types'
import type { User } from '@supabase/supabase-js'

type Coach = Tables<'coaches'>

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient<Database>()
  
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const userProfile = ref<Coach | null>(null)
  const isCoach = ref(false)

  async function fetchUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error fetching user:', error)
      return
    }
    console.log('Fetched user:', data.user)
    user.value = data.user
    isAuthenticated.value = !!user.value

    if (user.value) {
      await fetchUserProfile()
    }
  }

  async function fetchUserProfile() {
    if (!user.value) {
      return
    }
    
    const { data } = await supabase
      .from('coaches')
      .select('*')
      .eq('id', user.value.id)
      .single()
    
    if (data) {
      userProfile.value = data
      isCoach.value = true
    }
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
    isAuthenticated.value = !!session?.user
    
    if (session?.user) {
      fetchUserProfile()
    } else {
      userProfile.value = null
      isCoach.value = false
    }
  })

  return {
    user,
    isAuthenticated,
    userProfile,
    isCoach,
    fetchUser
  }
})
