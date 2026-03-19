/**
 * Hidden honeypot field. Bots fill it; humans never see it.
 * Render inside any form to detect automated submissions.
 */
import React from "react";
import { HONEYPOT_FIELD } from "@/lib/abuse-protection";

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const HoneypotField = React.forwardRef<HTMLDivElement, HoneypotFieldProps>(
  ({ value, onChange }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          opacity: 0,
          height: 0,
          overflow: "hidden",
        }}
        tabIndex={-1}
      >
        <label htmlFor={HONEYPOT_FIELD}>Website</label>
        <input
          type="text"
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
    );
  }
);

HoneypotField.displayName = "HoneypotField";
