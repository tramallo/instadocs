import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aoeekfotukezicunfqlm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvZWVrZm90dWtlemljdW5mcWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0NTA3NjIsImV4cCI6MjAzODAyNjc2Mn0.ipmFcRM5IPXh2EgFZKBMyL4SQAlbkW3dvacp9O_MNO8"
//const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
//const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,  
        }
    }
)

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
})