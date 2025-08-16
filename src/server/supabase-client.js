import { createClient } from "@supabase/supabase-js";

const dashboardUrl = import.meta.env.VITE_SUPABASE_URL;
const dashboardKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(dashboardUrl, dashboardKey);