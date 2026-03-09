/**
 * Mutation hook for inquiry submission.
 */
import { useMutation } from "@tanstack/react-query";
import { submitInquiry } from "@/server/services/inquiries";
import type { InquiryFormData } from "../types";

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: (data: InquiryFormData) => submitInquiry(data),
  });
}
