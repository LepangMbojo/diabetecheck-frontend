import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-5xl font-bold text-stone-800 mb-6">
          Deteksi Risiko Diabetes <br /> Dengan Akurasi Medis
        </h1>
        <p className="font-sans text-lg text-stone-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          DiabeteCheck menggunakan teknologi AI dan 17 indikator dari CDC untuk memberikan
          penilaian risiko diabetes yang komprehensif dan dapat dipercaya. Konsultasi aman,
          terjamin, dan profesional dari kenyamanan rumah Anda.
        </p>
        <Link
          to="/check"
          className="inline-block px-8 py-4 bg-teal-800 text-white rounded-sm font-sans font-semibold hover:bg-teal-900 transition-colors mb-8"
        >
          Mulai Konsultasi AI
        </Link>
      </section>

      {/* Feature Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl font-bold text-stone-800 text-center mb-16">
          Mengapa Memilih DiabeteCheck?
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            {
              title: 'Berbasis Sains',
              desc: 'Menggunakan 17 indikator resmi CDC untuk penilaian risiko yang akurat.',
            },
            {
              title: 'Hasil Instan',
              desc: 'Dapatkan analisis mendalam dan rekomendasi dalam hitungan detik.',
            },
            {
              title: 'Privasi Terjamin',
              desc: 'Data Anda aman. Kami tidak menyimpan informasi pribadi yang sensitif.',
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-sm border border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-800 mb-3">
                {feature.title}
              </h3>
              <p className="font-sans text-stone-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 bg-white rounded-sm border border-stone-200 text-center">
        <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">
          Sudah siap mengetahui status kesehatan Anda?
        </h2>
        <p className="font-sans text-stone-600 mb-8">
          Isi formulir konsultasi dalam waktu kurang dari 5 menit untuk hasil analisis komprehensif.
        </p>
        <Link
          to="/check"
          className="inline-block px-6 py-3 bg-teal-800 text-white rounded-sm font-sans font-semibold hover:bg-teal-900 transition-colors"
        >
          Mulai Sekarang
        </Link>
      </section>
    </div>
  );
}