# Cloudflare Workers yayını

Bu proje Next.js static export kullanır. Cloudflare Workers Static Assets, out/ klasörünü yayımlar.

## Git deposu
Bu ZIP içindeki dharma-coffee klasörünün içeriğini deponuzun proje köküne yerleştirin. wrangler.jsonc, package.json ve next.config.ts aynı seviyede olmalı.

Önceki otomatik OpenNext kurulumunun dosyalarını bu pakete taşımayın. Bu paket orijinal statik Next.js ayarını içerir.

## Cloudflare Workers Build ayarları
Build command: npm run build
Deploy command: npx wrangler@4.151.0 deploy --config wrangler.jsonc
Root directory: package.json dosyasının bulunduğu klasör

Worker adı: dharma-website. Mevcut Cloudflare Worker adınız farklıysa wrangler.jsonc içindeki name değerini aynı yapın.

Varsa preview/non-production deploy command: npx wrangler@4.151.0 versions upload --config wrangler.jsonc

Output dizini sorulursa: out. .next kullanmayın.

Next.js config output: export olarak kalmalı. OpenNext kurulumu veya opennextjs-cloudflare build komutu gerekli değildir.

## Domain
Yayın başarılı olunca Cloudflare Worker Settings → Domains & Routes → Add → Custom Domain üzerinden dharmacoffee.uk ekleyin. Domainin Cloudflare zone içinde etkin olması gerekir.

## Yerel doğrulama
npm ci
npm run build

Uygulama derlemesi başarıyla kontrol edilmiştir. Cloudflare hesabınızdaki yayın bu paket hazırlanırken çalıştırılmamıştır.
