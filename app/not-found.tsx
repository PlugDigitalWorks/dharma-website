import { ButtonLink } from '@/components/ui/Button';
import { LineArt } from '@/components/ui/LineArt';
import { Logo } from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-[1440px] flex-col items-center justify-center gap-8 px-4 text-center">
      <a href="/" aria-label="Dharma, home">
        <Logo className="w-36" />
      </a>
      <LineArt name="dog" trigger="mount" className="w-40" />
      <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95]">Nothing brewing here.</h1>
      <p className="max-w-sm leading-relaxed text-stone">The page you were after has wandered off. The coffee is still on George Street.</p>
      <ButtonLink href="/">Back to the shop</ButtonLink>
    </main>
  );
}
