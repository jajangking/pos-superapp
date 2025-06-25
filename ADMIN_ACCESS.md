# 🔐 Cara Akses Admin Panel SuperApp

## 📋 Langkah-langkah Masuk Admin

### 1. 🚀 Jalankan Aplikasi
```bash
cd pos-superapp
npm run dev
```
Buka: http://localhost:3000

### 2. 📧 Buat Akun Admin
Ada 2 cara untuk jadi admin:

#### Cara 1: Email dengan kata "admin"
- Daftar dengan email yang mengandung kata "admin"
- Contoh: `admin@superapp.com`, `myadmin@gmail.com`, `admin123@yahoo.com`
- Password bebas (minimal 6 karakter)

#### Cara 2: Set role di database (untuk production)
- Daftar akun biasa dulu
- Masuk ke Supabase Dashboard
- Buka tabel `users`
- Ubah kolom `role` dari `customer` menjadi `admin`

### 3. 🔑 Login ke Aplikasi
1. Klik **"Masuk"** di header
2. Masukkan email & password admin
3. Setelah login, akan muncul menu **"Admin"** di header

### 4. 🎯 Akses Admin Panel
- Klik menu **"Admin"** di header, atau
- Langsung ke: http://localhost:3000/admin

## 🛠️ Fitur Admin Panel

### Dashboard Utama
- 📊 Statistik penjualan real-time
- 📈 Grafik pendapatan
- 📋 Daftar pesanan terbaru
- 👥 Data pelanggan

### Manajemen Konten
- 🍱 **Produk**: CRUD produk, kategori, harga
- 🖼️ **Banner**: Upload gambar promo
- ⚙️ **Settings**: Rekening bank, kontak, teks website
- 📝 **Form Builder**: Tambah field custom di checkout

### Manajemen Pesanan
- 📦 **Orders**: Kelola semua pesanan
- 🚚 **Tracking**: Update status pengiriman
- 💰 **Pembayaran**: Konfirmasi pembayaran

### Manajemen Karyawan
- 👨‍💼 **Employees**: Data karyawan & role
- 💵 **Payroll**: Hitung gaji otomatis
- 📄 **Slip Gaji**: Generate & download

## 🔧 Troubleshooting

### Tidak bisa akses admin?
1. ✅ Pastikan email mengandung "admin"
2. ✅ Cek di browser console ada error?
3. ✅ Pastikan Supabase connection OK
4. ✅ Coba logout & login ulang

### Menu Admin tidak muncul?
1. ✅ Refresh halaman
2. ✅ Cek email yang digunakan login
3. ✅ Pastikan role di database = "admin"

## 🎯 Demo Credentials

Untuk testing cepat, gunakan:
- **Email**: `admin@superapp.com`
- **Password**: `admin123`

*Note: Daftar dulu dengan credentials ini jika belum ada*

## 🚀 Production Setup

Untuk production, sebaiknya:
1. Hapus logika "email contains admin"
2. Set role admin manual di database
3. Gunakan environment variable untuk admin email
4. Implementasi proper role-based access control

---
*SuperApp Admin Panel - Built with ❤️ using Next.js & Supabase*