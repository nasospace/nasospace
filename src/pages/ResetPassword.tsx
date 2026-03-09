import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ROUTES } from "@/config/routes";
import { SEOHead } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import nasoLogo from "@/assets/naso-logo.png";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    // The recovery link sets a session automatically via the URL hash
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setHasSession(true);
      }
    });
    // Also check if already in a recovery session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate(ROUTES.ACCOUNT, { replace: true }), 2000);
    }
  };

  if (hasSession === null) {
    return null; // loading
  }

  return (
    <>
      <SEOHead
        title="Set New Password"
        description="Set a new password for your NASO account."
        noindex
      />
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <img src={nasoLogo} alt="NASO" className="mx-auto h-10 w-auto" />
            <h1 className="mt-6 font-groovy text-2xl font-bold">Set new password</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a new password for your account
            </p>
          </div>

          {!hasSession ? (
            <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
              <p className="font-display text-sm font-medium">Invalid or expired link</p>
              <p className="mt-2 text-sm text-muted-foreground">
                This reset link may have expired. Request a new one.
              </p>
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-2"
              >
                Request new link
              </Link>
            </div>
          ) : success ? (
            <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
              <p className="font-display text-sm font-medium">Password updated ✨</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Redirecting you to your account…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  minLength={6}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  minLength={6}
                />
              </div>

              {error && (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" disabled={loading} className="mt-2 w-full">
                {loading ? "Updating…" : "Update Password"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
