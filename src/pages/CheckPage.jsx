import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { predictDiabetes } from '../services/api';

export default function CheckPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    console.log("Data yang mau dikirim ke backend:", formData);
    
    try {
      const response = await predictDiabetes(formData);
      navigate('/result', { state: { result: response, inputData: formData } });
    } catch (err) {
      const errorMessage = err.details && err.details.length > 0
        ? err.details.join(' | ')
        : (err.error || 'Terjadi kesalahan. Silakan coba lagi.');

      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-white rounded-sm border border-stone-200 p-12">
        <h1 className="font-serif text-3xl font-bold text-stone-800 mb-3">
          Konsultasi Risiko Diabetes
        </h1>
        <p className="font-sans text-stone-600 mb-12">
          Isi formulir berikut dengan informasi kesehatan Anda yang akurat untuk mendapatkan
          penilaian risiko diabetes berbasis AI dan 17 indikator CDC.
        </p>

        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-300 rounded-sm">
            <p className="font-sans text-sm text-rose-800">
              <span className="font-semibold">Kesalahan:</span> {error}
            </p>
          </div>
        )}

        <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}