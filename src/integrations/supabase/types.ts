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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      intake_submissions: {
        Row: {
          address: string | null
          age: string | null
          anxiety_triggers: string | null
          appetite: string | null
          childhood_diseases: string | null
          complaint_associated: string | null
          complaint_causation: string | null
          complaint_duration: string | null
          complaint_frequency: string | null
          complaint_intensity: string | null
          complaint_location: string | null
          complaint_onset: string | null
          complaint_sensation: string | null
          complaint_treatment_tried: string | null
          consent_given: boolean
          consultation_type: string | null
          created_at: string
          current_medications: string | null
          date_of_birth: string | null
          email: string
          emergency_contact: string | null
          family_history: string | null
          fears_phobias: string | null
          food_cravings: string | null
          full_name: string
          gender: string | null
          id: string
          known_allergies: string | null
          main_complaint: string
          marital_status: string | null
          modalities: Json | null
          modality_notes: string | null
          occupation: string | null
          patient_signature: string
          perspiration: string | null
          phone: string
          previous_illnesses: string | null
          referred_by: string | null
          research_opt_out: boolean
          signed_date: string
          sleep_quality: string | null
          thirst: string | null
        }
        Insert: {
          address?: string | null
          age?: string | null
          anxiety_triggers?: string | null
          appetite?: string | null
          childhood_diseases?: string | null
          complaint_associated?: string | null
          complaint_causation?: string | null
          complaint_duration?: string | null
          complaint_frequency?: string | null
          complaint_intensity?: string | null
          complaint_location?: string | null
          complaint_onset?: string | null
          complaint_sensation?: string | null
          complaint_treatment_tried?: string | null
          consent_given?: boolean
          consultation_type?: string | null
          created_at?: string
          current_medications?: string | null
          date_of_birth?: string | null
          email: string
          emergency_contact?: string | null
          family_history?: string | null
          fears_phobias?: string | null
          food_cravings?: string | null
          full_name: string
          gender?: string | null
          id?: string
          known_allergies?: string | null
          main_complaint: string
          marital_status?: string | null
          modalities?: Json | null
          modality_notes?: string | null
          occupation?: string | null
          patient_signature: string
          perspiration?: string | null
          phone: string
          previous_illnesses?: string | null
          referred_by?: string | null
          research_opt_out?: boolean
          signed_date?: string
          sleep_quality?: string | null
          thirst?: string | null
        }
        Update: {
          address?: string | null
          age?: string | null
          anxiety_triggers?: string | null
          appetite?: string | null
          childhood_diseases?: string | null
          complaint_associated?: string | null
          complaint_causation?: string | null
          complaint_duration?: string | null
          complaint_frequency?: string | null
          complaint_intensity?: string | null
          complaint_location?: string | null
          complaint_onset?: string | null
          complaint_sensation?: string | null
          complaint_treatment_tried?: string | null
          consent_given?: boolean
          consultation_type?: string | null
          created_at?: string
          current_medications?: string | null
          date_of_birth?: string | null
          email?: string
          emergency_contact?: string | null
          family_history?: string | null
          fears_phobias?: string | null
          food_cravings?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          known_allergies?: string | null
          main_complaint?: string
          marital_status?: string | null
          modalities?: Json | null
          modality_notes?: string | null
          occupation?: string | null
          patient_signature?: string
          perspiration?: string | null
          phone?: string
          previous_illnesses?: string | null
          referred_by?: string | null
          research_opt_out?: boolean
          signed_date?: string
          sleep_quality?: string | null
          thirst?: string | null
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
    Enums: {},
  },
} as const
