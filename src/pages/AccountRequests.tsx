import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ROUTES } from "@/config/routes";
import { Skeleton } from "@/components/ui/skeleton";
import { useRequestHistory } from "@/features/account/hooks/useAccountData";
import { AccountSectionHeader } from "@/features/account/components/AccountSectionHeader";
import { RequestStatusCard } from "@/features/account/components/RequestStatusCard";
import { EmptyState } from "@/features/account/components/EmptyState";
import { SEOHead } from "@/components/shared/SEOHead";

export default function AccountRequestsPage() {
  const { requests, activeCount, isLoading } = useRequestHistory();

  return (
    <>
      <SEOHead title="Request History — NASO" description="Track your NASO inquiries and booking requests." />

      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <AccountSectionHeader
          title="Request History"
          emoji="📋"
          description={
            activeCount > 0
              ? `You have ${activeCount} active request${activeCount > 1 ? "s" : ""}.`
              : "All caught up!"
          }
        />
      </motion.div>

      {isLoading ? (
        <div className="mt-6 grid gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      ) : requests.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-6 grid gap-3"
        >
          {requests.map((req) => (
            <motion.div key={req.id} variants={fadeUp}>
              <RequestStatusCard request={req} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="mt-8">
          <EmptyState
            emoji="📬"
            title="No requests yet"
            description="When you inquire about an experience, workshop, or event — it'll show up here."
            ctaLabel="Browse experiences"
            ctaHref={ROUTES.EXPERIENCES}
          />
        </div>
      )}
    </>
  );
}
