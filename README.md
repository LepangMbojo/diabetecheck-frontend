# DiabetesCheck Frontend

Aplikasi frontend untuk sistem pemeriksaan dan pemantauan diabetes berbasis web. Dibangun dengan React, Vite, dan Tailwind CSS untuk memberikan pengalaman pengguna yang responsif dan modern.

## 🎯 Fitur Utama

- **Halaman Beranda** - Informasi umum tentang aplikasi
- **Pemeriksaan Diabetes** - Form input untuk data pemeriksaan
- **Hasil Pemeriksaan** - Menampilkan hasil analisis diabetes
- **Riwayat Pemeriksaan** - Melihat history pemeriksaan sebelumnya
- **UI Responsif** - Kompatibel dengan desktop dan mobile

## 🛠️ Tech Stack

- **React** v18.3.1 - Library UI
- **React Router DOM** v6.23.1 - Routing
- **Vite** v5.2.10 - Build tool & dev server
- **Tailwind CSS** v4.3.0 - Styling
- **Axios** v1.7.2 - HTTP client
- **PostCSS** - CSS processing

## 📁 Struktur Project

```
diabetecheck-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Footer.jsx          # Footer component
│   │   ├── InputForm.jsx       # Form untuk input data
│   │   ├── ResultCard.jsx      # Card untuk menampilkan hasil
│   │   └── LoadingSpinner.jsx  # Loading indicator
│   ├── pages/
│   │   ├── HomePage.jsx        # Halaman beranda
│   │   ├── CheckPage.jsx       # Halaman pemeriksaan
│   │   ├── ResultPage.jsx      # Halaman hasil
│   │   └── HistoryPage.jsx     # Halaman riwayat
│   ├── services/
│   │   └── api.js              # API service dengan Axios
│   ├── app.jsx                 # Root component dengan routing
│   └── main.jsx                # Entry point
├── vite.config.js              # Konfigurasi Vite
├── tailwind.config.js          # Konfigurasi Tailwind CSS
├── postcss.config.js           # Konfigurasi PostCSS
└── package.json                # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18 atau lebih tinggi
- npm atau yarn

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/diabetecheck-frontend.git
   cd diabetecheck-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment** (jika diperlukan)
   ```bash
   cp .env.example .env.local
   ```

### Development

Jalankan development server:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5173`

**Catatan:** Application mengharapkan API backend berjalan di `http://localhost:5000`. Vite akan melakukan proxy semua request `/api` ke backend tersebut.

### Building

Build untuk production:
```bash
npm run build
```

Output akan tersimpan di folder `dist/`

### Preview

Preview build hasil production secara lokal:
```bash
npm run preview
```

## 📋 Available Routes

| Route | Deskripsi |
|-------|-----------|
| `/` | Halaman utama |
| `/check` | Form pemeriksaan diabetes |
| `/result` | Menampilkan hasil pemeriksaan |
| `/history` | Riwayat pemeriksaan pengguna |

## 🔌 API Integration

Aplikasi berkomunikasi dengan backend melalui Axios service yang terletak di `src/services/api.js`.

**Base URL Backend:** `http://localhost:5000`

Contoh API call:
```javascript
import api from './services/api';

// GET request
const result = await api.get('/check-result');

// POST request
const response = await api.post('/check', {
  bloodGlucose: 120,
  age: 35,
  // ... other data
});
```

## 🎨 Styling

Aplikasi menggunakan **Tailwind CSS** untuk styling. Konfigurasi Tailwind terdapat di `tailwind.config.js`.

### Color Scheme
- Primary background: `slate-50`
- Primary text: `slate-900`
- Font: Sans serif

## 📦 Scripts

```bash
npm run dev      # Mulai development server
npm run build    # Build untuk production
npm run preview  # Preview build production
```

## 🤝 Contributing

Jika ingin berkontribusi:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Project ini dibuat untuk keperluan pembelajaran dan proyek DBS/HackLangit.

## 📧 Contact

Untuk pertanyaan atau saran, silakan buka issue di repository ini.

---

**Catatan:** Pastikan backend API sudah berjalan sebelum menjalankan frontend application.
