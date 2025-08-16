import { supabase } from "../server/supabase-client";

export async function isLoggedIn() { 
    const {data} = await supabase.auth.getSession(); 
    if (data?.session) { 
        const id = data.session.user.user_metadata.user_id; 
        const {data: user} = await supabase.from('profiles').select('*').eq('id', id);
        return user[0]?.is_admin;
    } else { 
        return false; 
    }
}