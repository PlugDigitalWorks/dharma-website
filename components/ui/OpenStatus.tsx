'use client';

import { useEffect, useState } from 'react';
import { getOpenStatus, hoursSummary, type OpenStatus as Status } from '@/lib/hours';
import type { OpeningHoursSpec } from '@/lib/types';

/** Live "Open now / Closed" pill, computed in the shop's time zone. */
export function OpenStatus({
  hours,
  timeZone,
  className,
}: {
  hours: OpeningHoursSpec[];
  timeZone: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus(hours, timeZone));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [hours, timeZone]);

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`} aria-live="polite">
      <span className="relative flex size-2">
        {status?.open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-open opacity-60 motion-reduce:hidden" />
        )}
        <span className={`relative size-2 rounded-full ${status?.open ? 'bg-open' : 'bg-stone'}`} />
      </span>
      {status?.label ?? hoursSummary(hours)}
    </span>
  );
}
