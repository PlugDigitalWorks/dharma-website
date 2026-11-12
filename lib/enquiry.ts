import type { EnquiryField, EnquiryFormConfig, EnquiryPayload } from '@/lib/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators: Record<EnquiryField, (value: string) => string | null> = {
  name: (v) => (v.length >= 2 ? null : 'Please tell us your name.'),
  email: (v) => (EMAIL_RE.test(v) ? null : 'Please enter a valid email address.'),
  date: (v) => (v ? null : 'Please choose a date.'),
  guests: (v) => {
    const n = Number(v);
    return Number.isInteger(n) && n >= 2 && n <= 40 ? null : 'Between 2 and 40 guests.';
  },
  message: () => null,
};

/** Validates one field; used for inline validation in the form. */
export function validateField(field: EnquiryField, value: unknown): string | null {
  return validators[field](String(value ?? '').trim());
}

/** Validates the required fields of a form. Returns an empty object when valid. */
export function validateEnquiry(payload: EnquiryPayload, form: EnquiryFormConfig) {
  const errors: Partial<Record<EnquiryField, string>> = {};
  for (const field of form.required) {
    const error = validateField(field, payload[field]);
    if (error) errors[field] = error;
  }
  return errors;
}
