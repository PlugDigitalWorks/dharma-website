import type { DayOfWeek, OpeningHoursSpec } from '@/lib/types';

/** Indexed like `Date#getDay()`: 0 = Sunday. */
const WEEK: DayOfWeek[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const MONDAY_FIRST: DayOfWeek[] = [...WEEK.slice(1), WEEK[0]];
const SHORT: Record<DayOfWeek, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** "08:00" → "8am", "17:30" → "5:30pm". `compact` drops am/pm: "8", "5:30". */
export function formatTime(hhmm: string, compact = false) {
  const minutes = toMinutes(hhmm);
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const base = m ? `${h12}:${String(m).padStart(2, '0')}` : `${h12}`;
  return compact ? base : `${base}${h24 >= 12 ? 'pm' : 'am'}`;
}

function hoursFor(specs: OpeningHoursSpec[], day: DayOfWeek) {
  return specs.find((s) => s.days.includes(day));
}

export type HoursGroup = {
  days: DayOfWeek[];
  opens: string;
  closes: string;
};

/** Groups consecutive days (Mon → Sun) that share the same hours. */
export function groupHours(specs: OpeningHoursSpec[]): HoursGroup[] {
  const groups: HoursGroup[] = [];
  for (const day of MONDAY_FIRST) {
    const spec = hoursFor(specs, day);
    if (!spec) continue;
    const last = groups.at(-1);
    const prevDay = MONDAY_FIRST[MONDAY_FIRST.indexOf(day) - 1];
    if (last && last.opens === spec.opens && last.closes === spec.closes && last.days.at(-1) === prevDay) {
      last.days.push(day);
    } else {
      groups.push({ days: [day], opens: spec.opens, closes: spec.closes });
    }
  }
  return groups;
}

/** "Monday to Saturday" / "Sunday" — or short: "Mon to Sat" / "Sun". */
export function dayRangeLabel(days: DayOfWeek[], short = false) {
  const name = (d: DayOfWeek) => (short ? SHORT[d] : d);
  return days.length === 1 ? name(days[0]) : `${name(days[0])} to ${name(days.at(-1)!)}`;
}

/** "Mon to Sat 8 to 6, Sun 9 to 6" */
export function hoursSummary(specs: OpeningHoursSpec[]) {
  return groupHours(specs)
    .map((g) => `${dayRangeLabel(g.days, true)} ${formatTime(g.opens, true)} to ${formatTime(g.closes, true)}`)
    .join(', ');
}

export type OpenStatus = { open: boolean; label: string };

/** Whether the shop is open at `now` in the shop's time zone. */
export function getOpenStatus(specs: OpeningHoursSpec[], timeZone: string, now = new Date()): OpenStatus {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const dayIndex = WEEK.indexOf(part('weekday') as DayOfWeek);
  const minutes = Number(part('hour')) * 60 + Number(part('minute'));

  const today = hoursFor(specs, WEEK[dayIndex]);
  if (today && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
    return { open: true, label: `Open now, until ${formatTime(today.closes)}` };
  }
  if (today && minutes < toMinutes(today.opens)) {
    return { open: false, label: `Closed, opens today at ${formatTime(today.opens)}` };
  }
  for (let offset = 1; offset <= 7; offset++) {
    const day = WEEK[(dayIndex + offset) % 7];
    const next = hoursFor(specs, day);
    if (next) {
      const when = offset === 1 ? 'tomorrow' : `on ${day}`;
      return { open: false, label: `Closed, opens ${when} at ${formatTime(next.opens)}` };
    }
  }
  return { open: false, label: 'Closed' };
}
