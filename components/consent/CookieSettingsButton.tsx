'use client';

import type { ReactNode } from 'react';
import { buttonClass, type ButtonStyle } from '@/components/ui/Button';
import { openCookieSettings } from '@/lib/consent';

export function CookieSettingsButton({ children, ...style }: ButtonStyle & { children: ReactNode }) {
  return (
    <button type="button" onClick={openCookieSettings} className={buttonClass(style)}>
      {children}
    </button>
  );
}
