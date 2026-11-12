'use client';

import { Button } from '@base-ui/react/button';
import { Dialog } from '@base-ui/react/dialog';
import { Field } from '@base-ui/react/field';
import { Form } from '@base-ui/react/form';
import { useState, type ReactNode } from 'react';
import { submitEnquiry } from '@/lib/api/enquiry';
import { validateField } from '@/lib/enquiry';
import type { EnquiryField, EnquiryFormConfig, EnquiryPayload, EnquiryResult } from '@/lib/types';
import { buttonClass, type ButtonStyle } from './Button';
import { LineArt } from './LineArt';

const inputClass =
  'min-h-12 w-full rounded-none border-0 border-b border-charcoal/40 bg-transparent px-0 text-base outline-none transition-colors placeholder:text-stone/60 focus:border-charcoal data-invalid:border-postbox';
const errorClass = 'text-sm text-postbox';

type Errors = Extract<EnquiryResult, { ok: false }>['errors'];

function FormField({
  name,
  label,
  required,
  children,
}: {
  name: EnquiryField;
  label: string;
  required: boolean;
  children: ReactNode;
}) {
  return (
    <Field.Root
      name={name}
      validate={required ? (value) => validateField(name, value) : undefined}
      className="flex flex-col gap-2"
    >
      <Field.Label className="text-xs font-semibold tracking-[0.14em] text-stone uppercase">{label}</Field.Label>
      {children}
      <Field.Error className={errorClass} />
    </Field.Root>
  );
}

/** A button that opens an enquiry form in a dialog. */
export function EnquiryDialog({
  form,
  children,
  className,
  ...style
}: ButtonStyle & { form: EnquiryFormConfig; children: ReactNode; className?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const has = (field: EnquiryField) => form.fields.includes(field);
  const req = (field: EnquiryField) => form.required.includes(field);

  async function onSubmit(values: Record<string, unknown>) {
    const str = (key: EnquiryField) => (typeof values[key] === 'string' ? (values[key] as string).trim() : undefined);
    if (values.company) return; // honeypot
    const payload: EnquiryPayload = {
      kind: form.kind,
      email: str('email') ?? '',
      name: str('name'),
      date: str('date'),
      guests: str('guests'),
      message: str('message'),
    };
    setState('sending');
    try {
      const result = await submitEnquiry(payload, form);
      if (!result.ok) {
        setErrors(result.errors);
        setState('idle');
        return;
      }
      setErrors({});
      setState('done');
    } catch {
      setErrors({ form: 'No connection. Please try again.' });
      setState('idle');
    }
  }

  return (
    <Dialog.Root onOpenChangeComplete={(open) => !open && setState('idle')}>
      <Dialog.Trigger className={`${buttonClass(style)} ${className ?? ''}`}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          data-lenis-prevent
          className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100svh-2rem)] w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-chalk p-8 text-charcoal shadow-2xl transition-[opacity,transform] duration-500 ease-out-soft data-ending-style:opacity-0 data-starting-style:translate-y-[-46%] data-starting-style:opacity-0 md:p-12"
        >
          <div className="flex items-start justify-between gap-6">
            <LineArt name={form.art} trigger="mount" className="w-24" duration={1.2} />
            <Dialog.Close className="min-h-11 cursor-pointer text-[15px] hover:text-stone">Close</Dialog.Close>
          </div>
          <Dialog.Title className="mt-6 font-display text-4xl leading-tight md:text-5xl">{form.title}</Dialog.Title>

          {state === 'done' ? (
            <div className="mt-6 flex flex-col gap-8">
              <Dialog.Description className="text-lg leading-relaxed">{form.done}</Dialog.Description>
              <Dialog.Close className="inline-flex min-h-11 cursor-pointer items-center justify-center self-start rounded-full bg-charcoal px-6 text-[15px] font-medium text-chalk hover:bg-stone">
                Done
              </Dialog.Close>
            </div>
          ) : (
            <>
              <Dialog.Description className="mt-4 leading-relaxed text-stone">{form.intro}</Dialog.Description>
              <Form className="mt-8 flex flex-col gap-6" errors={errors} onFormSubmit={(values) => onSubmit(values)}>
                {has('name') && (
                  <FormField name="name" label="Name" required={req('name')}>
                    <Field.Control aria-required={req('name')} autoComplete="name" className={inputClass} />
                  </FormField>
                )}
                {has('email') && (
                  <FormField name="email" label="Email" required={req('email')}>
                    <Field.Control
                      inputMode="email"
                      aria-required={req('email')}
                      autoComplete="email"
                      spellCheck={false}
                      className={inputClass}
                    />
                  </FormField>
                )}
                {(has('date') || has('guests')) && (
                  <div className="grid grid-cols-2 gap-6">
                    {has('date') && (
                      <FormField name="date" label="Date" required={req('date')}>
                        <Field.Control type="date" aria-required={req('date')} className={inputClass} />
                      </FormField>
                    )}
                    {has('guests') && (
                      <FormField name="guests" label="Guests" required={req('guests')}>
                        <Field.Control
                          inputMode="numeric"
                          aria-required={req('guests')}
                          placeholder="2 to 40"
                          className={inputClass}
                        />
                      </FormField>
                    )}
                  </div>
                )}
                {has('message') && (
                  <FormField name="message" label="Tell us about it" required={req('message')}>
                    <Field.Control render={<textarea rows={3} />} className={`${inputClass} min-h-24 resize-none py-3`} />
                  </FormField>
                )}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute -left-[9999px] h-0 w-0"
                />
                {errors.form && (
                  <p className={errorClass} role="alert">
                    {errors.form}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={state === 'sending'}
                  focusableWhenDisabled
                  className="mt-2 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-charcoal px-6 text-[15px] font-medium text-chalk transition-colors hover:bg-stone data-disabled:opacity-60"
                >
                  {state === 'sending' ? 'Sending' : form.submit}
                </Button>
              </Form>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
