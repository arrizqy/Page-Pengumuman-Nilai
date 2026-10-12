import React, { useState } from 'react';
import { Search, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { StudentReport } from '../types';

interface StudentLookupProps {
  onSearch: (nim: string) => Promise<boolean>;
  isLoading: boolean;
  searchError: string | null;
  onClear: () => void;
  currentReport: StudentReport | null;
  availableNims?: string[];
}

export const StudentLookup: React.FC<StudentLookupProps> = ({
  onSearch,
  isLoading,
  searchError,
  onClear,
}) => {
  const [inputNim, setInputNim] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputNim.trim()) return;
    await onSearch(inputNim.trim());
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Pencarian Skor Angka UTS Mahasiswa
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Periksa Skor Nilai Ujian Tengah Semester (UTS)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Masukkan Nomor Induk Mahasiswa (NIM). Halaman ini khusus menampilkan skor nilai angka evaluasi UTS Anda.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Basis Data UTS Real-Time
        </div>
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="nim-field" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Nomor Induk Mahasiswa (NIM)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                id="nim-field"
                type="text"
                value={inputNim}
                onChange={(e) => setInputNim(e.target.value)}
                placeholder="Masukkan NIM Anda (contoh: 202401001)"
                className="w-full pl-11 pr-4 py-3.5 text-base sm:text-lg font-medium text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                autoComplete="off"
                disabled={isLoading}
              />
              {inputNim && (
                <button
                  type="button"
                  onClick={() => {
                    setInputNim('');
                    onClear();
                  }}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-600 font-medium"
                >
                  Hapus
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputNim.trim()}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer min-w-[170px]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Memeriksa...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Cek Nilai UTS</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Error Alert */}
        {searchError && (
          <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="font-semibold block">Data Nilai UTS Tidak Ditemukan</strong>
              <span>{searchError}</span>
            </div>
          </div>
        )}
      </form>

      {/* Trust Notice */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Privasi Terjaga: Hasil skor UTS hanya ditampilkan untuk mahasiswa pemilik NIM.</span>
        </div>
        <span className="text-slate-400">Khusus Nilai UTS Semester Ini</span>
      </div>
    </section>
  );
};
