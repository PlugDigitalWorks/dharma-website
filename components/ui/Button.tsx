import type { AnchorHTMLAttributes } from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'link';
export type ButtonTone = 'light' | 'dark';
export type ButtonStyle = { variant?: ButtonVariant; tone?: ButtonTone };

const tones: Record<ButtonTone, Record<ButtonVariant, string>> = {
  light: {
    solid: 'bg-charcoal text-chalk hover:bg-stone',
    outline: 'border border-charcoal/60 text-charcoal hover:bg-charcoal hover:text-chalk',
    link: 'underline underline-offset-4 hover:text-stone',
  },
  dark: {
    solid: 'bg-chalk text-charcoal hover:bg-white',
    outline: 'border border-chalk/60 text-chalk hover:bg-chalk hover:text-charcoal',
    link: 'underline underline-offset-4 hover:text-chalk/70',
  },
};

export function buttonClass({ variant = 'solid', tone = 'light' }: ButtonStyle = {}) {
  const shape =
    variant === 'link'
      ? 'inline-flex min-h-11 items-center text-[15px]'
      : 'inline-flex min-h-11 items-center justify-center rounded-full px-6 text-[15px] font-medium tracking-[0.01em]';
  return `${shape} cursor-pointer whitespace-nowrap transition-colors duration-300 ${tones[tone][variant]}`;
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & ButtonStyle;

export function ButtonLink({ variant, tone, className, children, ...rest }: Props) {
  return (
    <a className={`${buttonClass({ variant, tone })} ${className ?? ''}`} {...rest}>
      {children}
    </a>
  );
}
