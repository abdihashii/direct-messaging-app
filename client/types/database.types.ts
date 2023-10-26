export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat_users: {
        Row: {
          chat_id: string
          created_at: string
          user_id: string
        }
        Insert: {
          chat_id: string
          created_at?: string
          user_id: string
        }
        Update: {
          chat_id?: string
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_users_chat_id_fkey"
            columns: ["chat_id"]
            referencedRelation: "chats"
            referencedColumns: ["chat_id"]
          },
          {
            foreignKeyName: "chat_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chats: {
        Row: {
          chat_id: string
          chat_name: string | null
          created_at: string
          last_message_at: string | null
        }
        Insert: {
          chat_id?: string
          chat_name?: string | null
          created_at?: string
          last_message_at?: string | null
        }
        Update: {
          chat_id?: string
          chat_name?: string | null
          created_at?: string
          last_message_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_id: string | null
          content: string
          is_read: boolean
          message_id: string
          sender_id: string
          sender_user_name: string | null
          timestamp: string
        }
        Insert: {
          chat_id?: string | null
          content: string
          is_read?: boolean
          message_id?: string
          sender_id: string
          sender_user_name?: string | null
          timestamp?: string
        }
        Update: {
          chat_id?: string | null
          content?: string
          is_read?: boolean
          message_id?: string
          sender_id?: string
          sender_user_name?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            referencedRelation: "chats"
            referencedColumns: ["chat_id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_user_name_fkey"
            columns: ["sender_user_name"]
            referencedRelation: "profiles"
            referencedColumns: ["user_name"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          updated_at: string | null
          user_id: string
          user_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          updated_at?: string | null
          user_id: string
          user_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          updated_at?: string | null
          user_id?: string
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
