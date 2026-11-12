import { logoSvg } from './logo-svg';

export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Dharma Specialty Coffee"
      className={`block [&>svg]:h-auto [&>svg]:w-full ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: logoSvg }}
    />
  );
}
