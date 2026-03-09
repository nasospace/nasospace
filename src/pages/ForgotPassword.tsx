import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ROUTES } from "@/config/routes";
import { SEOHead } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import nasoLogo from "@/assets/naso-logo.png";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Reset Password — NASO" description="Reset your NASO account password." />
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <img src={nasoLogo} alt="NASO" className="mx-auto h-10 w-auto" />
            <h1 className="mt-6 font-groovy text-2xl font-bold">Forgot your password?</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {sent ? (
            <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
              <p className="font-display text-sm font-medium">Check your inbox ✨</p>
              <p className="mt-2 text-sm text-muted-foreground">
                We sent a password reset link to <strong>{email}</strong>. It may take a minute to arrive.
              </p>
              <Link
                to={ROUTES.SIGN_IN}
                className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-2"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" disabled={loading} className="mt-2 w-full">
                {loading ? "Sending…" : "Send Reset Link"}
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              to={ROUTES.SIGN_IN}
              className="font-semibold text-primary underline underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
