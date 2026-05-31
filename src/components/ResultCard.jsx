export default function ResultCard({ result, inputData }) {
  // 1. Pengaman data: antisipasi jika data dari API terbungkus objek "data"
  const aiData = result?.data || result || {};
  
  const probability = aiData.probability || 0;
  const isAtRisk = aiData.prediction === 'Berisiko' || probability >= 0.5;
  const riskPercentage = Math.round(probability * 100);

  // Ambil label risiko langsung dari backend (sudah bahasa Indonesia)
  const riskLabel = aiData.risk_level || 'Risiko Rendah';

  const getRiskColor = () => {
    if (probability >= 0.8) return 'bg-rose-900';
    if (probability >= 0.6) return 'bg-rose-800';
    if (probability >= 0.4) return 'bg-amber-700';
    return 'bg-emerald-700';
  };

  const getRecommendation = () => {
    if (probability >= 0.8) {
      return 'Status Anda menunjukkan risiko sangat tinggi diabetes. Segera konsultasikan dengan dokter spesialis endokrinologi untuk pemeriksaan mendalam dan rencana manajemen kesehatan yang komprehensif.';
    }
    if (probability >= 0.6) {
      return 'Anda memiliki risiko tinggi diabetes. Direkomendasikan untuk melakukan pemeriksaan medis lengkap dan mulai mengubah gaya hidup sehat (diet, olahraga) dalam 4 minggu ke depan.';
    }
    if (probability >= 0.4) {
      return 'Risiko Anda sedang. Mulai terapkan kebiasaan sehat: aktivitas fisik 150 menit/minggu, diet seimbang, dan kontrol berat badan. Pemeriksaan rutin sangat disarankan.';
    }
    return 'Status kesehatan Anda menunjukkan risiko rendah. Pertahankan gaya hidup sehat Anda dengan olahraga teratur dan pola makan yang baik untuk mencegah peningkatan risiko di masa depan.';
  };

  return (
    <div className="space-y-8">
      {/* Main Result Card */}
      <div className="bg-white rounded-sm border border-stone-200 overflow-hidden">
        <div className={`${getRiskColor()} px-8 py-6 text-white`}>
          <h2 className="font-serif text-2xl font-bold mb-2">Hasil Analisis</h2>
          <p className="font-sans text-sm opacity-90">Berdasarkan 17 indikator CDC</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Risk Status */}
          <div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-sans text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">
                  Status Risiko
                </p>
                <h3 className={`font-serif text-3xl font-bold ${isAtRisk ? 'text-rose-800' : 'text-emerald-700'}`}>
                  {isAtRisk ? 'Berisiko' : 'Tidak Berisiko'}
                </h3>
              </div>
              <div className="text-right">
                <p className="font-sans text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">
                  Tingkat Risiko
                </p>
                <p className="font-sans text-xl font-bold text-stone-800">{riskLabel}</p>
              </div>
            </div>
          </div>

          {/* Probability Bar */}
          <div>
            <p className="font-sans text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
              Probabilitas Risiko
            </p>
            <div className="space-y-2">
              <div className="w-full bg-stone-200 rounded-sm h-3 overflow-hidden">
                <div
                  className={`h-full ${getRiskColor()} transition-all duration-500`}
                  style={{ width: `${riskPercentage}%` }}
                ></div>
              </div>
              <p className="font-sans text-sm font-semibold text-stone-700 text-center">
                {riskPercentage}%
              </p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="p-5 bg-stone-50 rounded-sm border border-stone-300">
            <p className="font-sans text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
              Rekomendasi
            </p>
            <p className="font-sans text-sm text-stone-700 leading-relaxed">
              {getRecommendation()}
            </p>
          </div>

          {/* Summary Grid - Menggunakan parameter baru standar CDC */}
          <div>
            <p className="font-sans text-xs uppercase tracking-wider text-stone-500 font-semibold mb-4">
              Ringkasan Parameter
            </p>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-stone-50 p-4 rounded-sm border border-stone-200 text-center">
                <p className="font-sans text-xs text-stone-500 mb-2">BMI</p>
                <p className="font-sans font-bold text-lg text-stone-800">{inputData?.BMI || 'N/A'}</p>
              </div>
              <div className="bg-stone-50 p-4 rounded-sm border border-stone-200 text-center">
                <p className="font-sans text-xs text-stone-500 mb-2">Hipertensi</p>
                <p className="font-sans font-bold text-lg text-stone-800">
                  {inputData?.HighBP === 1 ? 'Ya' : 'Tidak'}
                </p>
              </div>
              <div className="bg-stone-50 p-4 rounded-sm border border-stone-200 text-center">
                <p className="font-sans text-xs text-stone-500 mb-2">Kolesterol</p>
                <p className="font-sans font-bold text-lg text-stone-800">
                  {inputData?.HighChol === 1 ? 'Tinggi' : 'Normal'}
                </p>
              </div>
              <div className="bg-stone-50 p-4 rounded-sm border border-stone-200 text-center">
                <p className="font-sans text-xs text-stone-500 mb-2">Aktivitas</p>
                <p className="font-sans font-bold text-lg text-stone-800">
                  {inputData?.PhysActivity === 1 ? 'Aktif' : 'Tidak'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-amber-50 border border-amber-300 rounded-sm">
        <p className="font-sans text-xs text-amber-900">
          <span className="font-semibold">Penting:</span> Hasil ini adalah estimasi berdasarkan AI dan tidak menggantikan diagnosa medis profesional. Konsultasikan dengan dokter Anda untuk penilaian kesehatan yang komprehensif.
        </p>
      </div>
    </div>
  );
}