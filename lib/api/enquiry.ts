/**
 * Data access layer — browser-side calls.
 */
import { validateEnquiry } from '@/lib/enquiry';
import type { EnquiryFormConfig, EnquiryPayload, EnquiryResult } from '@/lib/types';

const MOCK_LATENCY_MS = 600;

/**
 * Sends an enquiry (Twickenham waitlist or event booking).
 * MOCK: validates, waits a moment and reports success. Nothing is stored or sent.
 */
export async function submitEnquiry(payload: EnquiryPayload, form: EnquiryFormConfig): Promise<EnquiryResult> {
  const errors = validateEnquiry(payload, form);
  if (Object.keys(errors).length) return { ok: false, errors };

  // TODO(api): POST the payload to the enquiry endpoint and map its errors to EnquiryResult.
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));
  return { ok: true };
}
