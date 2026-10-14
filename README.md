# Dharma Coffee — coming soon

Next.js App Router + TypeScript. Responsive English coming-soon page for dharmacoffee.uk.

## Local development

npm install
npm run dev

## Production

npm run build

Static export is generated in `out/`. Deploy with Vercel (Next.js preset) or upload `out/` to a static host, then connect dharmacoffee.uk through that host's domain settings.

## Brand details

Edit `app/brand.ts` for email and street address. The confirmed email is richmond@dharmacoffee.uk. The address and opening hours were supplied in the user’s Google Maps screenshot. Instagram profile: https://www.instagram.com/dharmacoffee.richmond/. The supplied official logo is stored in `public/dharma-logo.webp`. CSS crops the surrounding blank space without modifying the original image.

No mailing list or contact form stores personal data. Contact buttons open the visitor's email application. There is no invented launch date or countdown.
