import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ResultCard from '../components/ResultCard';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, inputData } = location.state || {};

  useEffect(() => {
    if (!result || !inputData) {
      navigate('/check');
    }
  }, [result, inputData, navigate]);

  if (!result || !inputData) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-8">
        <Link to="/check" className="font-sans text-sm text-teal-800 hover:text-teal-900 flex items-center gap-2">
          ← Kembali ke Form
        </Link>
      </div>

      <ResultCard result={result} inputData={inputData} />

      <div className="mt-12 flex justify-center gap-4">
        <Link
          to="/check"
          className="px-6 py-3 bg-stone-800 text-white rounded-sm font-sans font-semibold hover:bg-stone-900 transition-colors"
        >
          Konsultasi Ulang
        </Link>
        <Link
          to="/history"
          className="px-6 py-3 bg-teal-800 text-white rounded-sm font-sans font-semibold hover:bg-teal-900 transition-colors"
        >
          Lihat Riwayat
        </Link>
      </div>
    </div>
  );
}