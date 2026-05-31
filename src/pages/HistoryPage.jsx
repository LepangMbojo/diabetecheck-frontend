import { useEffect, useState } from 'react';

import { getHistory, clearHistory } from '../services/api';
import { Link } from 'react-router-dom';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const responseData = await getHistory();
        const dataArray = Array.isArray(responseData) ? responseData : responseData.data || [];
        setHistory(dataArray);
      } catch (err) {
        setError('Gagal mengambil riwayat. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // FUNGSI UNTUK MENGHAPUS RIWAYAT
  const handleClearHistory = async () => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus seluruh riwayat konsultasi? Tindakan ini tidak dapat dibatalkan.");
    
    if (confirmDelete) {
      setIsDeleting(true);
      try {
        await clearHistory();
        setHistory([]);
      } catch (err) {
        setError('Gagal menghapus riwayat. Pastikan server merespons.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getRiskBadgeColor = (probability) => {
    if (probability >= 0.8) return 'bg-rose-100 text-rose-800 border border-rose-200';
    if (probability >= 0.6) return 'bg-rose-50 text-rose-700 border border-rose-200';
    if (probability >= 0.4) return 'bg-amber-100 text-amber-800 border border-amber-200';
    return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAgeLabel = (ageCode) => {
    const ageMap = {
      1: '18-24 thn', 2: '25-29 thn', 3: '30-34 thn', 4: '35-39 thn',
      5: '40-44 thn', 6: '45-49 thn', 7: '50-54 thn', 8: '55-59 thn',
      9: '60-64 thn', 10: '65-69 thn', 11: '70-74 thn', 12: '75-79 thn', 13: '80+ thn'
    };
    return ageMap[ageCode] || 'Umum';
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="bg-white rounded-sm border border-stone-200 p-8 shadow-sm">
        
        {/* BAGIAN HEADER  */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 border-b border-stone-200 pb-4 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-stone-800 mb-1">
              Riwayat Konsultasi
            </h1>
            <p className="font-sans text-stone-500 text-sm">Rekaman hasil evaluasi kesehatan metabolik AI.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Tombol Hapus Semua */}
            {history.length > 0 && (
              <button 
                onClick={handleClearHistory}
                disabled={isDeleting}
                className="px-4 py-2.5 bg-white border border-rose-200 text-rose-700 rounded-sm font-sans font-semibold text-sm hover:bg-rose-50 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Menghapus...' : 'Hapus Semua'}
              </button>
            )}
            <Link to="/check" className="px-5 py-2.5 bg-stone-900 text-white rounded-sm font-sans font-semibold text-sm hover:bg-stone-800 transition-colors">
              + Konsultasi Baru
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-300 rounded-sm">
            <p className="font-sans text-sm text-rose-800">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="inline-block w-6 h-6 border-3 border-teal-800 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 bg-stone-50 border border-stone-200 border-dashed rounded-sm">
            <p className="font-sans text-stone-500 mb-6 font-medium">Belum ada riwayat konsultasi yang tersimpan.</p>
            <Link
              to="/check"
              className="inline-block px-8 py-3 bg-teal-800 text-white rounded-sm font-sans font-semibold hover:bg-teal-900 transition-colors"
            >
              Mulai Tes Pertama Anda
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-300 bg-stone-50/50">
                  <th className="font-sans text-xs uppercase tracking-wider font-bold text-stone-500 text-left py-4 px-4">Tanggal</th>
                  <th className="font-sans text-xs uppercase tracking-wider font-bold text-stone-500 text-left py-4 px-4">Usia</th>
                  <th className="font-sans text-xs uppercase tracking-wider font-bold text-stone-500 text-left py-4 px-4">BMI</th>
                  <th className="font-sans text-xs uppercase tracking-wider font-bold text-stone-500 text-left py-4 px-4">Hipertensi</th>
                  <th className="font-sans text-xs uppercase tracking-wider font-bold text-stone-500 text-left py-4 px-4">Kolesterol</th>
                  <th className="font-sans text-xs uppercase tracking-wider font-bold text-stone-500 text-center py-4 px-4">Tingkat Risiko</th>
                  <th className="font-sans text-xs uppercase tracking-wider font-bold text-stone-500 text-center py-4 px-4">Probabilitas</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record, idx) => {
                  const input = record.input_received || {};
                  
                  return (
                    <tr key={idx} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                      <td className="font-sans text-sm text-stone-600 py-4 px-4 whitespace-nowrap">
                        {formatDate(record.timestamp)}
                      </td>
                      <td className="font-sans text-sm text-stone-800 font-medium py-4 px-4 whitespace-nowrap">
                        {getAgeLabel(input.Age)}
                      </td>
                      <td className="font-sans text-sm text-stone-800 font-medium py-4 px-4">
                        {input.BMI || 'N/A'}
                      </td>
                      <td className="font-sans text-sm text-stone-600 py-4 px-4">
                        {input.HighBP === 1 ? 'Ya' : 'Tidak'}
                      </td>
                      <td className="font-sans text-sm text-stone-600 py-4 px-4">
                        {input.HighChol === 1 ? 'Tinggi' : 'Normal'}
                      </td>
                      <td className="font-sans text-sm py-4 px-4 text-center whitespace-nowrap">
                        <span className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${getRiskBadgeColor(record.probability)}`}>
                          {record.risk_level || record.prediction}
                        </span>
                      </td>
                      <td className="font-sans text-sm text-stone-800 py-4 px-4 text-center font-bold">
                        {Math.round((record.probability || 0) * 100)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}