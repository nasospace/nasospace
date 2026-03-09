import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { useAccountData } from "@/features/account/hooks/useAccountData";
import { AccountSectionHeader } from "@/features/account/components/AccountSectionHeader";
import { AccountSummaryCard } from "@/features/account/components/AccountSummaryCard";
import { SavedItemCard } from "@/features/account/components/SavedItemCard";
import { RequestStatusCard } from "@/features/account/components/RequestStatusCard";
import { SEOHead } from "@/components/shared/SEOHead";

export default function AccountPage() {
  const { user, savedItems, requests, savedCount, requestCount } = useAccountData();

  return (
    <>
      <SEOHead title="Your Account — NASO" description="Your NASO space — saved items, requests, and settings." />

      {/* Welcome */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Hey, {user.name} <span className="inline-block origin-bottom-right animate-bounce">👋</span>
        </h2>
        <p className="mt-1 text-muted-foreground">
          Welcome back to your NASO space.
        </p>
      </motion.div>

      {/* Summary cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
      >
        <motion.div variants={fadeUp}>
          <AccountSummaryCard emoji="♥" label="Saved Items" count={savedCount} href={ROUTES.ACCOUNT_SAVED} />
        </motion.div>
        <motion.div variants={fadeUp}>
          <AccountSummaryCard emoji="📋" label="Requests" count={requestCount} href={ROUTES.ACCOUNT_REQUESTS} />
        </motion.div>
        <motion.div variants={fadeUp} className="col-span-2 md:col-span-1">
          <AccountSummaryCard emoji="⚙️" label="Settings" count={0} href={ROUTES.ACCOUNT_SETTINGS} />
        </motion.div>
      </motion.div>

      {/* Recent saved */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
        <AccountSectionHeader
          title="Recently Saved"
          emoji="♥"
          action={
            <Link to={ROUTES.ACCOUNT_SAVED} className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          }
        />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {savedItems.slice(0, 2).map((item) => (
            <SavedItemCard key={item.id} item={item} />
          ))}
        </div>
      </motion.section>

      {/* Recent requests */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
        <AccountSectionHeader
          title="Recent Requests"
          emoji="📋"
          action={
            <Link to={ROUTES.ACCOUNT_REQUESTS} className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          }
        />
        <div className="mt-4 grid gap-3">
          {requests.slice(0, 2).map((req) => (
            <RequestStatusCard key={req.id} request={req} />
          ))}
        </div>
      </motion.section>

      {/* Explore CTA */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center"
      >
        <span className="text-3xl">🌿</span>
        <h3 className="mt-3 font-display text-lg font-semibold">Discover more NASO</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Explore experiences, workshops, and products from Cairo's creative scene.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="outline" className="rounded-full">
            <Link to={ROUTES.EXPERIENCES}>Experiences</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to={ROUTES.WORKSHOPS}>Workshops</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to={ROUTES.SHOP}>Shop</Link>
          </Button>
        </div>
      </motion.div>
    </>
  );
}
