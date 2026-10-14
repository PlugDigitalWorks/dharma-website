# Dharma Coffee — Deploy rehberi

Next.js 16.4.0 + React 19.3.0 + TypeScript. Son sürüm; logo, Richmond adresi, çalışma saatleri, e-posta ve Instagram bağlantısı dahildir.

## Gereksinim
Node.js 20.9 veya üzeri ve npm.

## Yerelde çalıştırma
```sh
npm ci
npm run dev
```
Tarayıcıda http://127.0.0.1:3000 adresini açın.

## Üretim derlemesi
```sh
npm ci
npm run build
```
Bu proje statik export kullanır. Yayına hazır dosyalar `out/` klasöründe oluşur. Statik export için `next start` kullanılmaz.

## Vercel
1. ZIP dosyasını açın ve proje klasörünü kendi GitHub deponuza yükleyin.
2. Vercel'de Add New Project ile depoyu içe aktarın.
3. Framework: Next.js. Install Command: npm ci. Build Command: npm run build. Diğer ayarları otomatik bırakın.
4. Deploy tamamlandıktan sonra Settings → Domains bölümüne dharmacoffee.uk ekleyin.
5. Domain sağlayıcınızda Vercel'in gösterdiği DNS kayıtlarını uygulayın. www kullanacaksanız www.dharmacoffee.uk adresini de ekleyin.

## Statik hosting / cPanel / Cloudflare Pages
`npm run build` sonrasında `out/` içeriğini hosting'in web kök dizinine yükleyin. cPanel'de bu genellikle public_html klasörüdür. _next klasörünü de dahil edin. Cloudflare Pages için build komutu npm run build, output klasörü out olarak ayarlanır.

ZIP içindeki `out/` klasörü son sürümün hazır derlemesini de içerir; doğrudan statik hosting'e yüklenebilir. Kaynaklarda değişiklik yaptıysanız yeniden derleyin.

## İçerik düzenleme
- app/brand.ts: adres, e-posta, çalışma saatleri ve Instagram
- app/page.tsx: sayfa metinleri ve düzen
- app/globals.css: renkler ve responsive tasarım
- public/dharma-logo.webp: sağlanan resmi logo
- app/layout.tsx: başlık, SEO ve ana domain

Ortam değişkeni veya gizli anahtar gerekmez. İletişim düğmeleri e-posta uygulamasını açar.
