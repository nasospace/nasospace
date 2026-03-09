import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAccountData } from "@/features/account/hooks/useAccountData";
import { AccountSectionHeader } from "@/features/account/components/AccountSectionHeader";
import { SettingsSection } from "@/features/account/components/SettingsSection";
import { SEOHead } from "@/components/shared/SEOHead";

export default function AccountSettingsPage() {
  const { user } = useAccountData();

  return (
    <>
      <SEOHead title="Settings — NASO" description="Manage your NASO account settings." />

      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <AccountSectionHeader
          title="Settings"
          emoji="⚙️"
          description="Your profile and preferences."
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-6 grid gap-4"
      >
        {/* Profile info */}
        <motion.div variants={fadeUp}>
          <SettingsSection title="Profile" description="Your account information.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs text-muted-foreground">Name</Label>
                <p className="mt-1 font-display text-sm font-medium">{user.name}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p className="mt-1 font-display text-sm font-medium">{user.email}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Member since</Label>
                <p className="mt-1 font-display text-sm font-medium">
                  {new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </SettingsSection>
        </motion.div>

        {/* Communication preferences */}
        <motion.div variants={fadeUp}>
          <SettingsSection
            title="Communication"
            description="How you'd like to hear from us."
          >
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">New experiences & workshops</p>
                  <p className="text-xs text-muted-foreground">Get notified about upcoming events</p>
                </div>
                <Switch defaultChecked disabled aria-label="New experiences notifications" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Shop drops & limited editions</p>
                  <p className="text-xs text-muted-foreground">Be the first to know about new products</p>
                </div>
                <Switch defaultChecked disabled aria-label="Shop notifications" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Community updates</p>
                  <p className="text-xs text-muted-foreground">Stories, recaps, and community news</p>
                </div>
                <Switch disabled aria-label="Community notifications" />
              </div>
            </div>
            <p className="mt-4 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
              These preferences will be connected when accounts go live. For now, they're just here so you know what's coming. ✨
            </p>
          </SettingsSection>
        </motion.div>

        {/* Help / Support */}
        <motion.div variants={fadeUp}>
          <SettingsSection title="Help & Support">
            <p className="text-sm text-muted-foreground">
              Have a question or need help with something? We're always happy to chat.
            </p>
            <Button asChild variant="outline" className="mt-4 rounded-full">
              <Link to={ROUTES.CONTACT}>Get in touch</Link>
            </Button>
          </SettingsSection>
        </motion.div>
      </motion.div>
    </>
  );
}
