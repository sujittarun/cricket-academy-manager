// Points at the Academy Manager platform, not GenAlpha's old project.
// GenAlpha is now a tenant (tenant_id='genalpha') alongside raj, leo, mpp,
// matchpoint and demo, and its data lives in the shared tables.
//
// The client sets db.schema='genalpha' (see script.js), so every
// .from('students') resolves to genalpha.students — a security_invoker
// view over public.members joined to genalpha.student_details. The app's
// table names, column names and uuid ids are unchanged.
window.GEN_ALPHA_SUPABASE_CONFIG = {
  url: "https://ugsklcipzyiogxynshnh.supabase.co",
  anonKey: "sb_publishable_Lrxh3RceGcj7g5JEefze_g_R-bMtAn3",
};

window.GEN_ALPHA_FEATURES = {
  aiIntakeEnabled: true,
};

window.GEN_ALPHA_PAYMENT_CONFIG = {
  upiId: "9059962499@ybl",
  mobileNumber: "9059962499",
  payeeName: "Gen Alpha Cricket Academy",
  notePrefix: "Gen Alpha admission",
};
