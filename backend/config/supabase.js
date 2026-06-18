const { createClient } = require("@supabase/supabase-js");
const config = require("./db");

if (!config.supabaseUrl || !config.supabaseServiceKey) {
  console.warn("WARNING: Supabase URL or Service Key is missing. Supabase Client may fail.");
}

const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

module.exports = { supabase };
