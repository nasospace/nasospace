import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { z } from "zod";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { HoneypotField } from "@/components/shared/HoneypotField";
import {
  isHoneypotTriggered,
  isRateLimited,
  recordSubmission,
  isTooFast,
  HONEYPOT_FIELD,
} from "@/lib/abuse-protection";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const mountedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const raw = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    // Abuse checks
    if (isHoneypotTriggered({ [HONEYPOT_FIELD]: honeypot })) {
      setSent(true); // silent success for bots
      return;
    }
    if (isTooFast(mountedAt.current)) {
      setError("Please take a moment to fill out the form.");
      return;
    }
    if (isRateLimited("contact", { maxAttempts: 3, windowMs: 120_000 })) {
      setError("Too many messages. Please wait a couple of minutes.");
      return;
    }

    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please check your input.");
      return;
    }

    setSending(true);

    try {
      // Submit as a "general" inquiry type
      const { error: dbError } = await supabase.from("inquiries").insert({
        name: result.data.name,
        email: result.data.email,
        inquiry_type: "general",
        notes: result.data.message,
        device_id: "contact-form",
      });

      if (dbError) {
        setError("Something went wrong. Please try again.");
        setSending(false);
        return;
      }

      recordSubmission("contact");
      setSending(false);
      setSent(true);
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSending(false);
    }
  };

  if (sent) {
    return (
      <MotionDiv>
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="font-groovy text-xl font-bold">Thanks for reaching out! ✦</p>
          <p className="mt-2 text-sm text-muted-foreground">
            We'll get back to you within 1–2 business days.
          </p>
        </div>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv>
      <div className="rounded-2xl border border-border bg-card p-8">
        <h3 className="font-groovy text-xl font-bold">Send a quick message</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Got a quick question? Drop us a note and we'll reply fast.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <HoneypotField value={honeypot} onChange={setHoneypot} />

          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" name="name" placeholder="Your name" required maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" name="email" type="email" placeholder="you@example.com" required maxLength={255} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder="What's on your mind?"
              rows={4}
              required
              maxLength={2000}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={sending}>
            {sending ? "Sending…" : "Send message"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </MotionDiv>
  );
}
