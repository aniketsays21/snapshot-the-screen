import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  return { data, error }
}

export const signInWithPhone = async (phone: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: phone,
  })
  return { data, error }
}

export const verifyOTP = async (phone: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: 'sms'
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Database helper functions
export const createUserProfile = async (userId: string, userData: any) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([
      {
        id: userId,
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ])
  return { data, error }
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
  return { data, error }
}

// Action Plans database functions
export const createActionPlan = async (userId: string, planData: any) => {
  const { data, error } = await supabase
    .from('action_plans')
    .insert([
      {
        ...planData,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ])
  return { data, error }
}

export const getUserActionPlans = async (userId: string) => {
  const { data, error } = await supabase
    .from('action_plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const updateActionPlan = async (planId: string, updates: any) => {
  const { data, error } = await supabase
    .from('action_plans')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', planId)
  return { data, error }
}

// Chat History database functions
export const saveChatMessage = async (userId: string, messageData: any) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      {
        ...messageData,
        user_id: userId,
        created_at: new Date().toISOString()
      }
    ])
  return { data, error }
}

export const getChatHistory = async (userId: string, authorName: string) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('user_id', userId)
    .eq('author_name', authorName)
    .order('created_at', { ascending: true })
  return { data, error }
}

// Shelf Items database functions
export const saveToShelf = async (userId: string, itemData: any) => {
  const { data, error } = await supabase
    .from('shelf_items')
    .insert([
      {
        ...itemData,
        user_id: userId,
        created_at: new Date().toISOString()
      }
    ])
  return { data, error }
}

export const getUserShelfItems = async (userId: string) => {
  const { data, error } = await supabase
    .from('shelf_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}