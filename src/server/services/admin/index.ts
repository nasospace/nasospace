/**
 * Admin services — re-export from modular files.
 * Migration note: All Supabase references are isolated in sub-modules.
 */
export { checkIsAdmin } from "./role-check";
export { getOverviewStats, type AdminOverviewStats } from "./overview";
export {
  getInquiries,
  getInquiryTypes,
  updateInquiryStatus,
  updateInquiryAdminNotes,
  type AdminInquiry,
  type InquiryFilterOpts,
} from "./inquiries";
export { getProfiles, type AdminProfile } from "./profiles";
export {
  getSavedItemsSignals,
  getSavedItemsAggregates,
  getTopSavedItems,
  type SavedItemSignal,
  type SavedItemAggregate,
  type TopSavedItem,
} from "./saved-items";
