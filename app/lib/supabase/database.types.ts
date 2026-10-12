export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          brand: string
          storage: string
          condition: string
          quality: string
          warranty: string
          price: number
          price_max: number | null
          image: string
          badge: string | null
          wa_link: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          brand: string
          storage: string
          condition: string
          quality: string
          warranty: string
          price: number
          price_max?: number | null
          image: string
          badge?: string | null
          wa_link: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          brand?: string
          storage?: string
          condition?: string
          quality?: string
          warranty?: string
          price?: number
          price_max?: number | null
          image?: string
          badge?: string | null
          wa_link?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          name: string
          avatar: string | null
          text: string
          rating: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          avatar?: string | null
          text: string
          rating?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          avatar?: string | null
          text?: string
          rating?: number | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
