# Film Keşif ve Değerlendirme Platformu

Next.js, TypeScript ve JWT authentication ile geliştirilmiş modern bir film keşif platformu.

## 🎬 Özellikler

- **Kullanıcı Yönetimi**
  - JWT tabanlı güvenli authentication
  - Kullanıcı kayıt ve giriş
  - Korumalı rotalar

- **Film Kataloğu**
  - Zengin film detayları (başlık, açıklama, tür, yönetmen, süre, poster)
  - Film arama ve filtreleme
  - Tür bazlı kategorilendirme
  - Popüler filmler listesi

- **Değerlendirme Sistemi**
  - 1-5 yıldız arası puanlama
  - Detaylı yorum yazma
  - Kullanıcı değerlendirmelerini görüntüleme
  - Ortalama puan ve toplam değerlendirme sayısı

- **Modern Arayüz**
  - Responsive tasarım
  - Temiz ve kullanıcı dostu arayüz
  - CSS Modules ile stil yönetimi

## 🛠 Teknolojiler

- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **HTTP Client:** Axios
- **Authentication:** JWT (JSON Web Tokens)
- **Cookie Yönetimi:** js-cookie
- **İkonlar:** React Icons
- **Stil:** CSS Modules

## 📁 Proje Yapısı

```
movie-app/
├── src/
│   ├── app/                      # Next.js App Router sayfaları
│   │   ├── auth/
│   │   │   ├── login/           # Giriş sayfası
│   │   │   └── register/        # Kayıt sayfası
│   │   ├── movies/
│   │   │   ├── [id]/            # Film detay sayfası
│   │   │   └── page.tsx         # Film listesi sayfası
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Ana sayfa
│   │   └── globals.css          # Global stiller
│   │
│   ├── components/              # React componentleri
│   │   ├── common/              # Genel UI componentleri
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Textarea/
│   │   │   ├── Card/
│   │   │   └── Rating/
│   │   ├── layout/              # Layout componentleri
│   │   │   ├── Header/
│   │   │   └── Footer/
│   │   └── movies/              # Film componentleri
│   │       ├── MovieCard/
│   │       └── MovieList/
│   │
│   ├── contexts/                # React Context'leri
│   │   └── AuthContext.tsx     # Authentication context
│   │
│   ├── services/                # API servis katmanı
│   │   ├── auth.service.ts     # Authentication servisleri
│   │   ├── movie.service.ts    # Film servisleri
│   │   └── review.service.ts   # Değerlendirme servisleri
│   │
│   ├── types/                   # TypeScript tip tanımlamaları
│   │   └── index.ts
│   │
│   └── utils/                   # Yardımcı fonksiyonlar
│       └── axios.ts            # Axios instance ve interceptors
│
├── public/                      # Statik dosyalar
├── .env.local                   # Ortam değişkenleri
├── next.config.js              # Next.js konfigürasyonu
├── tsconfig.json               # TypeScript konfigürasyonu
└── package.json                # Proje bağımlılıkları
```

## 🚀 Kurulum

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd movie-app
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın:**

`.env.local` dosyasını düzenleyin:

```env
API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret_key_here
NEXT_PUBLIC_JWT_EXPIRATION=7d
NEXT_PUBLIC_APP_NAME=Film Keşif Platformu
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📚 API Endpoint'leri

### Authentication
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/auth/me` - Mevcut kullanıcı bilgileri
- `POST /api/auth/logout` - Çıkış

### Movies
- `GET /api/movies` - Tüm filmleri listele (filtreleme ve pagination)
- `GET /api/movies/:id` - Film detaylarını getir
- `GET /api/movies/popular` - Popüler filmleri getir
- `GET /api/movies/genres` - Tüm türleri listele
- `GET /api/movies/search` - Film ara
- `POST /api/movies` - Yeni film ekle
- `PUT /api/movies/:id` - Film güncelle
- `DELETE /api/movies/:id` - Film sil

### Reviews
- `GET /api/movies/:id/reviews` - Film yorumlarını listele
- `GET /api/users/:id/reviews` - Kullanıcı yorumlarını listele
- `GET /api/reviews/:id` - Yorum detaylarını getir
- `GET /api/movies/:id/my-review` - Kullanıcının film yorumunu getir
- `POST /api/reviews` - Yeni yorum ekle
- `PUT /api/reviews/:id` - Yorum güncelle
- `DELETE /api/reviews/:id` - Yorum sil

## 🔐 Authentication Akışı

1. Kullanıcı kayıt olur veya giriş yapar
2. Backend JWT token döner
3. Token cookie'de saklanır (7 gün süreyle)
4. Her API isteğinde token Authorization header'ında gönderilir
5. Token geçersizse kullanıcı login sayfasına yönlendirilir

## 🎨 Componentler

### Common Components
- **Button**: Farklı varyant ve boyutlarda buton
- **Input**: Validasyon destekli input alanı
- **Textarea**: Çok satırlı metin alanı
- **Card**: İçerik kartı container'ı
- **Rating**: Yıldız tabanlı değerlendirme componenti

### Movie Components
- **MovieCard**: Film kartı (liste görünümü için)
- **MovieList**: Film grid listesi

### Layout Components
- **Header**: Üst navigasyon barı
- **Footer**: Alt bilgi alanı

## 🔧 Geliştirme

### Build
```bash
npm run build
```

### Production Server
```bash
npm start
```

### Linting
```bash
npm run lint
```

## 📝 Notlar

- Backend API'nin `http://localhost:3001/api` adresinde çalışıyor olması gerekmektedir
- Tüm authenticated istekler için geçerli bir JWT token gereklidir
- Filmler için poster görselleri `posterUrl` field'ında saklanır
- Değerlendirmeler 1-5 arası puan ve yorum içerir

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
