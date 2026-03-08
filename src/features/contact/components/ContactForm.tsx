import { useState } from "react";
import { Send } from "lucide-react";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      setSent(true);
      toast.success("Message sent! We'll get back to you soon.");
    }, 1200);
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
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" name="name" placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder="What's on your mind?"
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={sending}>
            {sending ? "Sending…" : "Send message"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </MotionDiv>
  );
}
