import { useState } from 'react';

export default function InputForm({ onSubmit, isLoading }) {
  // 1. STATE DISAMAKAN PERSIS DENGAN BACKEND CDC
  const [formData, setFormData] = useState({
    Age: '',
    Sex: '',
    HighBP: '',
    HighChol: '',
    CholCheck: '1',
    GenHlth: '',
    MentHlth: '',
    PhysHlth: '',
    DiffWalk: '',
    PhysActivity: '',
    Fruits: '',
    Veggies: '',
    HvyAlcoholConsump: '',
    Smoker: '',
    Stroke: '',
    HeartDiseaseorAttack: '',
  });

  const [fisik, setFisik] = useState({ height: '', weight: '' });
  const [bmi, setBmi] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFisikChange = (e) => {
    const { name, value } = e.target;
    setFisik((prev) => ({ ...prev, [name]: value }));

    const height = name === 'height' ? parseFloat(value) : parseFloat(fisik.height);
    const weight = name === 'weight' ? parseFloat(value) : parseFloat(fisik.weight);

    if (height > 0 && weight > 0) {
      const heightM = height / 100;
      const calculatedBmi = Math.round(weight / (heightM * heightM));
      if (calculatedBmi >= 10 && calculatedBmi <= 100) {
        setBmi(calculatedBmi);
      } else {
        setBmi(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 2. PAYLOAD SEKARANG MENGAMBIL DARI NAMA YANG BENAR
    const payload = {
      Age: Number(formData.Age),
      Sex: Number(formData.Sex),
      HighBP: Number(formData.HighBP),
      HighChol: Number(formData.HighChol),
      CholCheck: Number(formData.CholCheck),
      GenHlth: Number(formData.GenHlth),
      MentHlth: Number(formData.MentHlth),
      PhysHlth: Number(formData.PhysHlth),
      DiffWalk: Number(formData.DiffWalk),
      PhysActivity: Number(formData.PhysActivity),
      Fruits: Number(formData.Fruits),
      Veggies: Number(formData.Veggies),
      HvyAlcoholConsump: Number(formData.HvyAlcoholConsump),
      Smoker: Number(formData.Smoker),
      Stroke: Number(formData.Stroke),
      HeartDiseaseorAttack: Number(formData.HeartDiseaseorAttack),
      BMI: bmi ? Number(bmi) : 25, 
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Metrik Fisik */}
      <section>
        <h3 className="font-serif text-xl font-bold text-stone-800 mb-8 pb-4 border-b border-stone-300">
          Metrik Fisik
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Kategori Usia *
            </label>
            <select
              name="Age"
              value={formData.Age}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800"
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="1">18-24 tahun</option>
              <option value="2">25-29 tahun</option>
              <option value="3">30-34 tahun</option>
              <option value="4">35-39 tahun</option>
              <option value="5">40-44 tahun</option>
              <option value="6">45-49 tahun</option>
              <option value="7">50-54 tahun</option>
              <option value="8">55-59 tahun</option>
              <option value="9">60-64 tahun</option>
              <option value="10">65-69 tahun</option>
              <option value="11">70-74 tahun</option>
              <option value="12">75-79 tahun</option>
              <option value="13">80 tahun ke atas</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Jenis Kelamin *
            </label>
            <select
              name="Sex"
              value={formData.Sex}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800"
            >
              <option value="">-- Pilih --</option>
              <option value="0">Perempuan</option>
              <option value="1">Laki-laki</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Tinggi Badan (cm) *
            </label>
            <input
              type="number"
              name="height"
              value={fisik.height}
              onChange={handleFisikChange}
              placeholder="170"
              min="50"
              max="250"
              required
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800"
            />
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Berat Badan (kg) *
            </label>
            <input
              type="number"
              name="weight"
              value={fisik.weight}
              onChange={handleFisikChange}
              placeholder="70"
              min="20"
              max="300"
              required
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800"
            />
          </div>
        </div>

        {bmi && (
          <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-sm">
            <p className="font-sans text-sm text-stone-700">
              <span className="font-semibold">BMI Anda:</span> <span className="text-teal-800 font-bold text-lg">{bmi}</span>
            </p>
          </div>
        )}
      </section>

      {/* Kondisi Klinis */}
      <section>
        <h3 className="font-serif text-xl font-bold text-stone-800 mb-8 pb-4 border-b border-stone-300">
          Kondisi Klinis
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Didiagnosis Tekanan Darah Tinggi *
            </label>
            <select name="HighBP" value={formData.HighBP} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800">
              <option value="">-- Pilih --</option>
              <option value="0">Tidak</option>
              <option value="1">Ya</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Didiagnosis Kolesterol Tinggi *
            </label>
            <select name="HighChol" value={formData.HighChol} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800">
              <option value="">-- Pilih --</option>
              <option value="0">Tidak</option>
              <option value="1">Ya</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Riwayat Stroke *
            </label>
            <select name="Stroke" value={formData.Stroke} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800">
              <option value="">-- Pilih --</option>
              <option value="0">Tidak</option>
              <option value="1">Ya</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Riwayat Penyakit Jantung Koroner *
            </label>
            <select name="HeartDiseaseorAttack" value={formData.HeartDiseaseorAttack} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800">
              <option value="">-- Pilih --</option>
              <option value="0">Tidak</option>
              <option value="1">Ya</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Kondisi Kesehatan Umum *
            </label>
            <select name="GenHlth" value={formData.GenHlth} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800">
              <option value="">-- Pilih --</option>
              <option value="1">Sangat Baik</option>
              <option value="2">Baik</option>
              <option value="3">Biasa Saja</option>
              <option value="4">Buruk</option>
              <option value="5">Sangat Buruk</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Kesulitan Berjalan/Naik Tangga *
            </label>
            <select name="DiffWalk" value={formData.DiffWalk} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800">
              <option value="">-- Pilih --</option>
              <option value="0">Tidak</option>
              <option value="1">Ya</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Kesehatan Fisik (Berapa hari sakit dalam 30 hari) *
            </label>
            <input type="number" name="PhysHlth" value={formData.PhysHlth} onChange={handleInputChange} placeholder="0" min="0" max="30" required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800" />
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Kesehatan Mental (Berapa hari stres dalam 30 hari) *
            </label>
            <input type="number" name="MentHlth" value={formData.MentHlth} onChange={handleInputChange} placeholder="0" min="0" max="30" required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800" />
          </div>
        </div>
      </section>

      {/* Pola Hidup */}
      <section>
        <h3 className="font-serif text-xl font-bold text-stone-800 mb-8 pb-4 border-b border-stone-300">
          Pola Hidup
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Rutin Berolahraga? *
            </label>
            <select name="PhysActivity" value={formData.PhysActivity} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800">
              <option value="">-- Pilih --</option>
              <option value="0">Tidak</option>
              <option value="1">Ya</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Konsumsi Buah Rutin? *
            </label>
            <select name="Fruits" value={formData.Fruits} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800">
              <option value="">-- Pilih --</option>
              <option value="0">Tidak</option>
              <option value="1">Ya</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Konsumsi Sayur Rutin? *
            </label>
            <select name="Veggies" value={formData.Veggies} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800">
              <option value="">-- Pilih --</option>
              <option value="0">Tidak</option>
              <option value="1">Ya</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Konsumsi Alkohol Berat? *
            </label>
            <select name="HvyAlcoholConsump" value={formData.HvyAlcoholConsump} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800">
              <option value="">-- Pilih --</option>
              <option value="0">Tidak</option>
              <option value="1">Ya</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-sm font-semibold text-stone-700 mb-2">
              Perokok Aktif? *
            </label>
            <select name="Smoker" value={formData.Smoker} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-stone-300 rounded-sm font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-800">
              <option value="">-- Pilih --</option>
              <option value="0">Tidak / Sudah Berhenti</option>
              <option value="1">Ya</option>
            </select>
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex justify-center pt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="px-10 py-3.5 bg-teal-800 text-white rounded-sm font-sans font-semibold hover:bg-teal-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Sedang Menganalisis...
            </>
          ) : (
            'Dapatkan Hasil Analisis'
          )}
        </button>
      </div>
    </form>
  );
}