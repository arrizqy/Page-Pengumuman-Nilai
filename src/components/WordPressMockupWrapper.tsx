import React from 'react';
import { Globe, Menu, Search, ExternalLink, ShieldCheck, X } from 'lucide-react';

interface WordPressMockupWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const WordPressMockupWrapper: React.FC<WordPressMockupWrapperProps> = ({ children, onClose }) => {
  return (
    <div className="relative border-4 border-slate-700 rounded-3xl overflow-hidden shadow-2xl bg-slate-100 my-6">
      
      {/* WordPress Admin / Browser Bar Simulation */}
      <div className="bg-slate-900 text-slate-300 px-4 py-2 text-xs flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          </div>
          <span className="font-mono text-slate-400 pl-2">
            https://kampus-anda.ac.id/pengumuman-nilai-mahasiswa/
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] bg-slate-800 px-2.5 py-0.5 rounded text-amber-300 font-medium">
            Simulasi Pratinjau Tema WordPress Induk
          </span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
            title="Keluar dari mode simulasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* WordPress Simulated Header / Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-700 text-white font-serif font-black flex items-center justify-center text-lg shadow-sm">
              W
            </div>
            <div>
              <span className="font-serif font-bold text-base text-slate-900 block leading-tight">
                PORTAL RESMI KAMPUS
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider uppercase">
                WordPress Theme (Astra / GeneratePress / Custom)
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <span className="hover:text-indigo-600 cursor-pointer">Beranda</span>
            <span className="hover:text-indigo-600 cursor-pointer">Profil</span>
            <span className="hover:text-indigo-600 cursor-pointer">Fakultas</span>
            <span className="text-indigo-600 border-b-2 border-indigo-600 pb-1 cursor-pointer">Akademik &amp; Nilai</span>
            <span className="hover:text-indigo-600 cursor-pointer">Kontak</span>
          </nav>

          <div className="flex items-center gap-2 text-slate-400 md:hidden">
            <Menu className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* WordPress Page Title & Breadcrumbs */}
      <div className="bg-gradient-to-r from-slate-100 to-indigo-50/50 border-b border-slate-200 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5 font-medium">
            <span>Beranda</span>
            <span>&rsaquo;</span>
            <span>Layanan Akademik</span>
            <span>&rsaquo;</span>
            <span className="text-indigo-600 font-semibold">Pengumuman Nilai Mahasiswa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Pengumuman Nilai &amp; Kartu Hasil Studi (KHS)
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Laman resmi pengecekan hasil evaluasi belajar semester mahasiswa secara mandiri dan aman.
          </p>
        </div>
      </div>

      {/* Embedded Component Area */}
      <main className="p-4 sm:p-8 max-w-6xl mx-auto">
        <div className="p-2 sm:p-4 bg-white rounded-2xl border border-dashed border-indigo-300 relative shadow-sm">
          <div className="absolute -top-3 left-6 bg-indigo-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
            Area Embed Blok HTML / Shortcode WordPress
          </div>
          {children}
        </div>
      </main>

      {/* WordPress Simulated Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 px-6 border-t border-slate-800 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-white font-bold mb-2">Sistem Akademik Terpadu</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Dikelola oleh Biro Administrasi Akademik &amp; Pusat Data Informasi Kampus. Seluruh hak cipta dilindungi.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Tautan Cepat</h4>
            <ul className="space-y-1 text-[11px]">
              <li>&bull; Kalender Akademik</li>
              <li>&bull; Panduan Pengisian KRS</li>
              <li>&bull; Layanan Pengaduan BAAK</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Keamanan &amp; Privasi</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Koneksi terenkripsi SSL 256-bit. Nilai mahasiswa terlindungi dari akses tidak sah.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500">
          &copy; {new Date().getFullYear()} Universitas &bull; Didukung oleh WordPress &amp; Real-Time Google Sheets
        </div>
      </footer>

    </div>
  );
};
