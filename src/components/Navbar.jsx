import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-teal-800 to-emerald-700 flex items-center justify-center">
            <span className="text-white font-serif text-lg font-bold">D</span>
          </div>
          <h1 className="font-serif text-xl font-bold text-stone-800">
            DiabeteCheck
          </h1>
        </Link>

        <div className="flex gap-8 items-center">
          <Link
            to="/"
            className="text-stone-600 hover:text-teal-800 font-sans text-sm transition-colors"
          >
            Beranda
          </Link>
          <Link
            to="/check"
            className="text-stone-600 hover:text-teal-800 font-sans text-sm transition-colors"
          >
            Konsultasi
          </Link>
          <Link
            to="/history"
            className="text-stone-600 hover:text-teal-800 font-sans text-sm transition-colors"
          >
            Riwayat
          </Link>
          <Link
            to="/check"
            className="px-5 py-2.5 bg-teal-800 text-white rounded-sm font-sans text-sm hover:bg-teal-900 transition-colors"
          >
            Mulai
          </Link>
        </div>
      </div>
    </nav>
  );
}