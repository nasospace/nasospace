import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get the authenticated user from the JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { deviceId } = await req.json();
    if (!deviceId) {
      return new Response(JSON.stringify({ error: "Missing deviceId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create anon client to verify the user
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const anonClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await anonClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use service role client to bypass RLS for migration
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    let migratedSaved = 0;
    let migratedInquiries = 0;

    // Migrate saved_items: update device_id rows to have user_id
    const { data: savedRows } = await adminClient
      .from("saved_items")
      .select("id, item_type, item_slug")
      .eq("device_id", deviceId)
      .is("user_id", null);

    if (savedRows && savedRows.length > 0) {
      // Check for duplicates — user may already have some saved items
      const { data: existingRows } = await adminClient
        .from("saved_items")
        .select("item_type, item_slug")
        .eq("user_id", user.id);

      const existingSet = new Set(
        (existingRows ?? []).map((r) => `${r.item_type}:${r.item_slug}`)
      );

      const toMigrate = savedRows.filter(
        (r) => !existingSet.has(`${r.item_type}:${r.item_slug}`)
      );
      const toDelete = savedRows.filter(
        (r) => existingSet.has(`${r.item_type}:${r.item_slug}`)
      );

      // Update non-duplicate rows
      if (toMigrate.length > 0) {
        await adminClient
          .from("saved_items")
          .update({ user_id: user.id })
          .in("id", toMigrate.map((r) => r.id));
        migratedSaved = toMigrate.length;
      }

      // Clean up duplicates
      if (toDelete.length > 0) {
        await adminClient
          .from("saved_items")
          .delete()
          .in("id", toDelete.map((r) => r.id));
      }
    }

    // Migrate inquiries: update device_id rows to have user_id
    const { data: inquiryRows } = await adminClient
      .from("inquiries")
      .select("id")
      .eq("device_id", deviceId)
      .is("user_id", null);

    if (inquiryRows && inquiryRows.length > 0) {
      await adminClient
        .from("inquiries")
        .update({ user_id: user.id })
        .in("id", inquiryRows.map((r) => r.id));
      migratedInquiries = inquiryRows.length;
    }

    return new Response(
      JSON.stringify({
        success: true,
        migratedSaved,
        migratedInquiries,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal error", details: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
