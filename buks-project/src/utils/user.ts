import supabase from "./supabase";

export async function ensureUserExists(userId: string, name: string) {
  const { data, error } = await supabase
    .from('users')
    .upsert({ id: userId, username: name })
    .select();

  if (error) console.error('Error ensuring user exists', error);
  return data;
}