import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null as any

export async function createReservationsTableIfNotExists() {
  if (!supabase) {
    return { error: 'Supabase client not initialized' }
  }
  
  try {
    const { error: selectError } = await supabase
      .from('reservations')
      .select('id')
      .limit(1)
    
    if (selectError && selectError.code === '42P01') {
      console.log('Reservations table does not exist. It will be created on first insert.')
    }
    
    return { error: null }
  } catch (err) {
    console.error('Error checking reservations table:', err)
    return { error: err }
  }
}