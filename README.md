# DiabeteCheck — Frontend

> Sistem Deteksi Dini Risiko Diabetes Berbasis AI  
> Tim CC26-PRU433 | Coding Camp 2026 powered by DBS Foundation

---

## Deskripsi Singkat

Frontend DiabeteCheck adalah aplikasi web yang dibangun menggunakan **Vite + React.js + Tailwind CSS**. Aplikasi ini memungkinkan pengguna mengisi kuesioner kesehatan 17 indikator berbasis dataset CDC BRFSS 2015, mengirimkan data ke backend API, dan menampilkan hasil prediksi risiko diabetes secara visual dan mudah dipahami.

### Tampilan Aplikasi

| Halaman | Deskripsi |
|---------|-----------|
| HomePage | Halaman beranda dengan informasi dan tombol CTA |
| CheckPage | Form input 17 indikator kesehatan |
| ResultPage | Halaman hasil prediksi dengan badge, progress bar, dan rekomendasi |
| HistoryPage | Riwayat semua prediksi yang pernah dilakukan |

---

## Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Bundler | Vite v5 |
| Framework | React.js 18 |
| Styling | Tailwind CSS |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Bahasa | JavaScript (JSX) |
| Deploy | Vercel |

---

## Prasyarat

Pastikan sudah terinstall:

- **Node.js** versi 18 atau lebih baru — [nodejs.org](https://nodejs.org)
- **npm** (sudah termasuk bersama Node.js)
- **Git** — untuk clone repository
- **Backend DiabeteCheck** harus berjalan (lihat README backend)

---

## Setup Environment Lokal

### Langkah 1 — Clone Repository

```bash
git clone https://github.com/LepangMbojo/diabetecheck-frontend.git
cd diabetecheck-frontend
```

### Langkah 2 — Install Dependency

```bash
npm install
```

### Langkah 3 — Setup File Environment

Salin file contoh environment:

```bash
# Windows
copy .env.example .env

# Mac / Linux
cp .env.example .env
```

Buka file `.env` dan sesuaikan isinya:

```env
VITE_API_URL=http://localhost:5000
```

> **Catatan:** `VITE_API_URL` diisi dengan URL backend yang sedang berjalan.  
> Untuk development lokal gunakan `http://localhost:5000`.  
> Untuk production gunakan URL Railway backend.

---

## Cara Menjalankan Aplikasi

Pastikan backend sudah berjalan terlebih dahulu, kemudian:

```bash
npm run dev
```

Aplikasi berjalan di: `http://localhost:5173`

**Build untuk production:**
```bash
npm run build
```

---

## Cara Menjalankan Seluruh Stack Secara Lokal

Untuk menjalankan aplikasi secara penuh, diperlukan **3 terminal** yang berjalan bersamaan:

**Terminal 1 — AI Service (FastAPI):**
```bash
cd "folder-model-export"
venv_diabetecheck\Scripts\activate
python main.py
```
> Berjalan di: `http://localhost:8000`  
> Download model di: [Google Drive](https://drive.google.com/drive/folders/12MmQJ1KL3iwwx-2JefKbkncB95rROyx1?usp=drive_link)

**Terminal 2 — Backend (Express.js):**
```bash
cd diabetecheck-backend/backend
npm run dev
```
> Berjalan di: `http://localhost:5000`

**Terminal 3 — Frontend (Vite + React):**
```bash
cd diabetecheck-frontend
npm run dev
```
> Berjalan di: `http://localhost:5173`

Buka browser dan akses: `http://localhost:5173`

---

## Struktur Folder

```
src/
├── components/
│   ├── Navbar.jsx          ← Navigation bar responsif
│   ├── Footer.jsx          ← Footer dengan disclaimer
│   ├── InputForm.jsx       ← Form 17 indikator kesehatan
│   ├── ResultCard.jsx      ← Tampilan hasil prediksi
│   └── LoadingSpinner.jsx  ← Indikator loading
├── pages/
│   ├── HomePage.jsx        ← Halaman beranda
│   ├── CheckPage.jsx       ← Halaman pemeriksaan
│   ├── ResultPage.jsx      ← Halaman hasil prediksi
│   └── HistoryPage.jsx     ← Halaman riwayat
├── services/
│   └── api.js              ← Axios instance + fungsi API
├── App.jsx                 ← Root component + routing
└── main.jsx                ← Entry point
```

---

## Konfigurasi API

Semua HTTP call ke backend dilakukan melalui `src/services/api.js`:

```javascript
// Fungsi yang tersedia
predictDiabetes(formData)  // POST /api/predict
getHistory()               // GET  /api/history
clearHistory()             // DELETE /api/history
```

---

## Format Data

**Request yang dikirim ke backend (`POST /api/predict`):**
```json
{
  "HighBP": 1,
  "HighChol": 1,
  "CholCheck": 1,
  "BMI": 28.5,
  "Smoker": 0,
  "Stroke": 0,
  "HeartDiseaseorAttack": 0,
  "PhysActivity": 1,
  "Fruits": 1,
  "Veggies": 1,
  "HvyAlcoholConsump": 0,
  "GenHlth": 3,
  "MentHlth": 0,
  "PhysHlth": 0,
  "DiffWalk": 0,
  "Sex": 0,
  "Age": 7
}
```

**Response yang diterima dari backend:**
```json
{
  "success": true,
  "data": {
    "prediction": "Berisiko",
    "probability": 0.7234,
    "risk_level": "Risiko Tinggi",
    "input_received": { "...17 field..." },
    "timestamp": "2026-06-04T10:00:00.000Z"
  }
}
```

---

## Deployment

Frontend production di-deploy ke **Vercel**:

> 🌐 [https://diabetecheck-frontend.vercel.app](https://diabetecheck-frontend.vercel.app)

Environment variable yang diset di Vercel dashboard:
```
VITE_API_URL=https://diabetecheck-backend-production.up.railway.app
```

---

## Troubleshooting

| Error | Penyebab | Solusi |
|-------|----------|--------|
| `Gagal menghubungi server` | Backend tidak berjalan | Pastikan backend Express aktif di port 5000 |
| Halaman form kosong / tidak load | `VITE_API_URL` tidak terset | Buat file `.env` dari `.env.example` |
| Prediksi tidak muncul setelah submit | AI Service tidak aktif | Jalankan `python main.py` di folder model |
| CORS error di browser | Backend URL salah | Pastikan `VITE_API_URL` sesuai dengan URL backend yang aktif |
| Redirect ke `/check` di ResultPage | Akses langsung tanpa data | Isi form di CheckPage terlebih dahulu |

---

## Link Terkait

| Resource | Link |
|----------|------|
| 🌐 Aplikasi (Production) | [diabetecheck-frontend.vercel.app](https://diabetecheck-frontend.vercel.app) |
| 🔧 Backend API | [diabetecheck-backend-production.up.railway.app](https://diabetecheck-backend-production.up.railway.app) |
| 📁 Model AI (Google Drive) | [Download Model](https://drive.google.com/drive/folders/12MmQJ1KL3iwwx-2JefKbkncB95rROyx1?usp=drive_link) |
| 📦 Repository Backend | [github.com/Bandit-Liar/diabetecheck-backend](https://github.com/Bandit-Liar/diabetecheck-backend) |

---

## Anggota Tim

| Nama | Role |
|------|------|
| Salman Alfarizi | Data Scientist |
| Ahmad Fatih Azizi Siregar | Data Scientist |
| Garrand Malona Simanjuntak | AI Engineer |
| Muhammad Rafi | Full-Stack Web Developer (Backend) |
| M Khalid Al Rejeki | Full-Stack Web Developer (Frontend) |

---

*DiabeteCheck — CC26-PRU433 | Coding Camp 2026 powered by DBS Foundation*
