export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cms_blog_posts: {
        Row: {
          author_name: string | null
          category: string
          content: string
          cover_image_alt: string
          cover_image_src: string
          created_at: string
          excerpt: string
          featured: boolean
          id: string
          linked_experience_slug: string | null
          linked_portfolio_slug: string | null
          linked_workshop_slug: string | null
          publish_date: string | null
          published: boolean
          reading_time: string
          slug: string
          tags: Json
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          category?: string
          content?: string
          cover_image_alt?: string
          cover_image_src?: string
          created_at?: string
          excerpt?: string
          featured?: boolean
          id?: string
          linked_experience_slug?: string | null
          linked_portfolio_slug?: string | null
          linked_workshop_slug?: string | null
          publish_date?: string | null
          published?: boolean
          reading_time?: string
          slug: string
          tags?: Json
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          category?: string
          content?: string
          cover_image_alt?: string
          cover_image_src?: string
          created_at?: string
          excerpt?: string
          featured?: boolean
          id?: string
          linked_experience_slug?: string | null
          linked_portfolio_slug?: string | null
          linked_workshop_slug?: string | null
          publish_date?: string | null
          published?: boolean
          reading_time?: string
          slug?: string
          tags?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_experiences: {
        Row: {
          capacity: number
          category: string
          cover_image_alt: string
          cover_image_src: string
          created_at: string
          currency: string
          date: string | null
          description: string
          difficulty: string
          featured: boolean
          gallery: Json
          id: string
          location: string | null
          price: number
          published: boolean
          slug: string
          summary: string
          tags: Json
          title: string
          updated_at: string
        }
        Insert: {
          capacity?: number
          category?: string
          cover_image_alt?: string
          cover_image_src?: string
          created_at?: string
          currency?: string
          date?: string | null
          description?: string
          difficulty?: string
          featured?: boolean
          gallery?: Json
          id?: string
          location?: string | null
          price?: number
          published?: boolean
          slug: string
          summary: string
          tags?: Json
          title: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          category?: string
          cover_image_alt?: string
          cover_image_src?: string
          created_at?: string
          currency?: string
          date?: string | null
          description?: string
          difficulty?: string
          featured?: boolean
          gallery?: Json
          id?: string
          location?: string | null
          price?: number
          published?: boolean
          slug?: string
          summary?: string
          tags?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_faq_items: {
        Row: {
          answer: string
          created_at: string
          group_emoji: string
          group_id: string
          group_label: string
          id: string
          published: boolean
          question: string
          sort_order: number
        }
        Insert: {
          answer: string
          created_at?: string
          group_emoji?: string
          group_id: string
          group_label: string
          id?: string
          published?: boolean
          question: string
          sort_order?: number
        }
        Update: {
          answer?: string
          created_at?: string
          group_emoji?: string
          group_id?: string
          group_label?: string
          id?: string
          published?: boolean
          question?: string
          sort_order?: number
        }
        Relationships: []
      }
      cms_page_content: {
        Row: {
          content: Json
          id: string
          page_key: string
          published: boolean
          section_key: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          content?: Json
          id?: string
          page_key: string
          published?: boolean
          section_key: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          content?: Json
          id?: string
          page_key?: string
          published?: boolean
          section_key?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      cms_portfolio_items: {
        Row: {
          audience_type: string | null
          category: string
          cover_image_alt: string
          cover_image_src: string
          created_at: string
          date: string | null
          featured: boolean
          gallery: Json
          id: string
          linked_experience_slug: string | null
          linked_workshop_slug: string | null
          location: string | null
          published: boolean
          slug: string
          story: string
          summary: string
          tags: Json
          testimonial_name: string | null
          testimonial_quote: string | null
          title: string
          updated_at: string
          vibe: string | null
        }
        Insert: {
          audience_type?: string | null
          category?: string
          cover_image_alt?: string
          cover_image_src?: string
          created_at?: string
          date?: string | null
          featured?: boolean
          gallery?: Json
          id?: string
          linked_experience_slug?: string | null
          linked_workshop_slug?: string | null
          location?: string | null
          published?: boolean
          slug: string
          story?: string
          summary: string
          tags?: Json
          testimonial_name?: string | null
          testimonial_quote?: string | null
          title: string
          updated_at?: string
          vibe?: string | null
        }
        Update: {
          audience_type?: string | null
          category?: string
          cover_image_alt?: string
          cover_image_src?: string
          created_at?: string
          date?: string | null
          featured?: boolean
          gallery?: Json
          id?: string
          linked_experience_slug?: string | null
          linked_workshop_slug?: string | null
          location?: string | null
          published?: boolean
          slug?: string
          story?: string
          summary?: string
          tags?: Json
          testimonial_name?: string | null
          testimonial_quote?: string | null
          title?: string
          updated_at?: string
          vibe?: string | null
        }
        Relationships: []
      }
      cms_products: {
        Row: {
          category: string
          colors: Json | null
          cover_image_alt: string
          cover_image_src: string
          created_at: string
          currency: string
          description: string
          featured: boolean
          gallery: Json
          id: string
          limited_edition: boolean
          linked_experience_slug: string | null
          linked_portfolio_slug: string | null
          linked_workshop_slug: string | null
          price: number
          published: boolean
          sizes: Json | null
          slug: string
          stock_status: string
          summary: string
          tags: Json
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          colors?: Json | null
          cover_image_alt?: string
          cover_image_src?: string
          created_at?: string
          currency?: string
          description?: string
          featured?: boolean
          gallery?: Json
          id?: string
          limited_edition?: boolean
          linked_experience_slug?: string | null
          linked_portfolio_slug?: string | null
          linked_workshop_slug?: string | null
          price?: number
          published?: boolean
          sizes?: Json | null
          slug: string
          stock_status?: string
          summary: string
          tags?: Json
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          colors?: Json | null
          cover_image_alt?: string
          cover_image_src?: string
          created_at?: string
          currency?: string
          description?: string
          featured?: boolean
          gallery?: Json
          id?: string
          limited_edition?: boolean
          linked_experience_slug?: string | null
          linked_portfolio_slug?: string | null
          linked_workshop_slug?: string | null
          price?: number
          published?: boolean
          sizes?: Json | null
          slug?: string
          stock_status?: string
          summary?: string
          tags?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      cms_testimonials: {
        Row: {
          context_tag: string | null
          created_at: string
          featured: boolean
          id: string
          image_url: string | null
          name: string
          published: boolean
          quote: string
          sort_order: number
          source_type: string
        }
        Insert: {
          context_tag?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          name: string
          published?: boolean
          quote: string
          sort_order?: number
          source_type?: string
        }
        Update: {
          context_tag?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          name?: string
          published?: boolean
          quote?: string
          sort_order?: number
          source_type?: string
        }
        Relationships: []
      }
      cms_workshops: {
        Row: {
          capacity: number
          category: string
          cover_image_alt: string
          cover_image_src: string
          created_at: string
          currency: string
          date: string | null
          description: string
          duration: string
          featured: boolean
          gallery: Json
          id: string
          location: string | null
          materials_included: boolean
          price: number
          published: boolean
          skill_level: string
          slug: string
          summary: string
          tags: Json
          title: string
          updated_at: string
        }
        Insert: {
          capacity?: number
          category?: string
          cover_image_alt?: string
          cover_image_src?: string
          created_at?: string
          currency?: string
          date?: string | null
          description?: string
          duration?: string
          featured?: boolean
          gallery?: Json
          id?: string
          location?: string | null
          materials_included?: boolean
          price?: number
          published?: boolean
          skill_level?: string
          slug: string
          summary: string
          tags?: Json
          title: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          category?: string
          cover_image_alt?: string
          cover_image_src?: string
          created_at?: string
          currency?: string
          date?: string | null
          description?: string
          duration?: string
          featured?: boolean
          gallery?: Json
          id?: string
          location?: string | null
          materials_included?: boolean
          price?: number
          published?: boolean
          skill_level?: string
          slug?: string
          summary?: string
          tags?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          admin_notes: string | null
          created_at: string
          device_id: string
          email: string
          group_size: string | null
          id: string
          inquiry_type: string
          item_slug: string | null
          item_title: string | null
          item_type: string | null
          last_updated: string
          name: string
          notes: string | null
          phone: string | null
          preferred_date: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          device_id: string
          email: string
          group_size?: string | null
          id?: string
          inquiry_type: string
          item_slug?: string | null
          item_title?: string | null
          item_type?: string | null
          last_updated?: string
          name: string
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          device_id?: string
          email?: string
          group_size?: string | null
          id?: string
          inquiry_type?: string
          item_slug?: string | null
          item_title?: string | null
          item_type?: string | null
          last_updated?: string
          name?: string
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          device_id: string
          display_name: string
          email: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          device_id: string
          display_name?: string
          email?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          device_id?: string
          display_name?: string
          email?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      saved_items: {
        Row: {
          created_at: string
          device_id: string
          id: string
          item_slug: string
          item_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          item_slug: string
          item_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          item_slug?: string
          item_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
