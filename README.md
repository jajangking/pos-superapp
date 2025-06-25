# SuperApp - Platform Pemesanan Online

SuperApp adalah platform pemesanan online yang powerful dengan admin CMS panel yang memungkinkan pengelolaan konten dan sistem secara dinamis.

## 🚀 Fitur Utama

### 🛒 Pemesanan (Login & Non-Login)
- **Tanpa login**: Input nama + WA + alamat → dapat link tracking
- **Dengan login**: Riwayat pesanan, alamat tersimpan, promo, loyalty point

### 🧾 Pembayaran Fleksibel
- Transfer manual (editable via admin)
- COD (bayar di tempat)
- E-Wallet (GoPay, OVO, DANA, ShopeePay)
- Admin dapat aktifkan/nonaktifkan metode pembayaran

### 🧭 Tracking Pesanan
- Tracking via nomor pesanan
- Status order real-time
- Informasi kurir dan estimasi waktu
- Riwayat perjalanan pesanan

### 🍱 Halaman Menu Editable
- Produk dan kategori dapat diatur dari admin
- Banner promo dapat diupload
- Teks dan CTA dapat dikustomisasi

### 🧑‍💼 Admin Panel Powerful
- **Manajemen Konten**: CRUD produk, kategori, banner, kontak
- **Manajemen Sistem**: Custom field checkout, label status, template notifikasi
- **Payroll & Karyawan**: CRUD karyawan, hitung gaji otomatis, slip gaji

## 🛠️ Teknologi

| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js App Router, Tailwind CSS, shadcn/ui |
| Backend | Supabase (Auth, DB, Storage, RLS, Realtime) |
| CMS | Supabase Tables sebagai Dynamic CMS |
| Deployment | Vercel |

## 📦 Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/jajangking/pos-superapp.git
   cd pos-superapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` dengan kredensial Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Setup database**
   - Buat project baru di [Supabase](https://supabase.com)
   - Jalankan SQL schema (akan disediakan terpisah)
   - Setup Row Level Security (RLS)

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:3000`

## 📁 Struktur Project

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── menu/              # Product catalog
│   ├── tracking/          # Order tracking
│   └── order-success/     # Order confirmation
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── admin/            # Admin-specific components
│   └── customer/         # Customer-facing components
├── contexts/             # React contexts
│   ├── AuthContext.tsx   # Authentication state
│   └── CartContext.tsx   # Shopping cart state
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
└── types/                # TypeScript type definitions
    └── index.ts          # Main type definitions
```

## 🗄️ Database Schema

### Tabel Utama

| Tabel | Fungsi |
|-------|--------|
| `products` | Data produk |
| `categories` | Kategori produk |
| `orders` | Pesanan user terdaftar |
| `guest_orders` | Pesanan tamu |
| `checkout_fields` | Custom field checkout |
| `settings` | Pengaturan sistem |
| `banners` | Banner promosi |
| `employees` | Data karyawan |
| `payrolls` | Data gaji |
| `notifications` | Template notifikasi |
| `tracking_logs` | Log tracking kurir |
| `couriers` | Data kurir |
| `vendors` | Data vendor/mitra |

## 🎯 Fitur Admin Panel

### Dashboard
- Statistik penjualan real-time
- Grafik pendapatan
- Status pesanan
- Aktivitas terbaru

### Manajemen Konten
- **Produk**: CRUD produk dengan upload gambar
- **Kategori**: Organisasi produk
- **Banner**: Upload dan atur banner promosi
- **Pengaturan**: Konfigurasi teks, kontak, rekening

### Manajemen Pesanan
- Daftar pesanan real-time
- Update status pesanan
- Assign kurir
- Tracking pengiriman

### Manajemen Karyawan & Payroll
- CRUD data karyawan
- Perhitungan gaji otomatis
- Generate slip gaji
- Laporan payroll

## 🔧 Kustomisasi

### Menambah Field Checkout Custom
1. Login ke admin panel
2. Masuk ke "Form Builder"
3. Tambah field baru dengan tipe yang diinginkan
4. Field akan otomatis muncul di halaman checkout

### Mengubah Template Notifikasi
1. Masuk ke "Notifications" di admin panel
2. Edit template WhatsApp/Email
3. Gunakan variabel dinamis seperti `{customer_name}`, `{order_number}`

### Mengelola Metode Pembayaran
1. Masuk ke "Settings" → "Payment Methods"
2. Aktifkan/nonaktifkan metode pembayaran
3. Update informasi rekening bank

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository di Vercel
3. Set environment variables
4. Deploy otomatis

### Manual Deployment
```bash
npm run build
npm start
```

## 🔐 Keamanan

- Row Level Security (RLS) di Supabase
- Authentication dengan Supabase Auth
- Role-based access control
- Input validation dan sanitization

## 📱 Responsive Design

- Mobile-first approach
- Optimized untuk semua device
- Touch-friendly interface
- Progressive Web App ready

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

- Email: support@superapp.com
- WhatsApp: +62 822-xxxx-xxxx
- Documentation: [docs.superapp.com](https://docs.superapp.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

**SuperApp** - Memudahkan bisnis Anda dengan platform pemesanan online yang powerful! 🚀
