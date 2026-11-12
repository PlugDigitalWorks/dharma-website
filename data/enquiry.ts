import type { EnquiryFormConfig, EnquiryKind } from '@/lib/types';

/** MOCK — enquiry dialog copy. Read it through `getEnquiryForms()` in lib/api.ts. */
export const enquiryForms: Record<EnquiryKind, EnquiryFormConfig> = {
  twickenham: {
    kind: 'twickenham',
    title: 'Twickenham, coming soon',
    intro:
      'A second window at Twickenham Station. Leave your email and you will hear first when the doors open.',
    art: 'shopfront',
    submit: 'Tell me first',
    done: 'Thank you. You will hear from us before anyone else.',
    fields: ['email'],
    required: ['email'],
  },
  event: {
    kind: 'event',
    title: 'Book the room',
    intro:
      'Birthdays, tastings, team mornings. Tell us a little and we will reply within two days.',
    art: 'pendant-lamps',
    submit: 'Send enquiry',
    done: 'Thank you. We will be in touch within two days.',
    fields: ['name', 'email', 'date', 'guests', 'message'],
    required: ['name', 'email', 'date', 'guests'],
  },
};
