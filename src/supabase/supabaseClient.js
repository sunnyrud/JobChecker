import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
};

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);
  return { data, error };
};

export const saveJobPreferences = async (userId, preferences) => {
  const { data, error } = await supabase
    .from("job_preferences")
    .upsert({
      user_id: userId,
      ...preferences,
    })
    .select();
  return { data, error };
};

export const getJobPreferences = async (userId) => {
  const { data, error } = await supabase
    .from("job_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();
  return { data, error };
};

// Job search functions
export const searchJobs = async (filters = {}) => {
  let query = supabase.from("jobs").select("*");

  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        query = query.in(key, value);
      } else if (typeof value === "string" && value.trim() !== "") {
        query = query.ilike(key, `%${value}%`);
      } else if (value !== null && value !== undefined) {
        query = query.eq(key, value);
      }
    }
  });

  const { data, error } = await query;
  return { data, error };
};
