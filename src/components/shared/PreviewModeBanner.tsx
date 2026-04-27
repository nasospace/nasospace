/**
 * Floating banner shown to admins when viewing a page with ?preview=1.
 * Confirms drafts are visible and provides a quick toggle back to live view.
 */
import { Eye } from "lucide-react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import { useAdminAuth } from "@/features/admin/hooks/useAdminAuth";

export function PreviewModeBanner() {
  const [params] = useSearchParams();
  const location = useLocation();
  const { isAdmin } = useAdminAuth();

  const previewActive = params.get("preview") === "1";
  if (!isAdmin) return null;

  if (previewActive) {
    return (
      <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-3 rounded-full border-[2.5px] border-foreground bg-naso-lemon px-4 py-2 shadow-retro-sm">
          <Eye className="h-4 w-4 text-foreground" />
          <span className="font-groovy text-xs font-bold uppercase tracking-wider text-foreground">
            Preview mode · drafts visible
          </span>
          <Link
            to={location.pathname}
            className="rounded-full bg-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background hover:bg-foreground/80"
          >
            Exit
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
